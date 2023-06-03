import React, { useState, useEffect, useRef } from 'react'
import styles from "./UserProfile.module.scss";
import classNames from "classnames/bind";
import Draggable from 'react-draggable';
import Swal from "sweetalert2";
import AuthUser from '../../utils/AuthUser';
import background from '../../img/content1.jpg'
import ConfirmationToast from '../../components/ConfirmationToast/ConfirmationToast';
import Headers from '../../layouts/Header/Header'
import Footer from '../../layouts/Footer/Footer';
import FormattedDate from '../../utils/FormattedDate';
import dayjs from 'dayjs';
import { avatarSelector } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Diamond } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { storage } from '../../utils/firebase'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { addAvatar } from '../../redux/actions';
import { DatePicker, Divider, Form, Input, Modal, Select, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { FaCheckCircle, FaInfoCircle, FaUser } from 'react-icons/fa';

const cx = classNames.bind(styles);

const UserProfile = () => {

	const updateFormLayout = {
		labelCol: {
			span: 6
		},
		wrapperCol: {
			span: 18
		},
	};

	const RANKING_BRONZE = "Bronze";
	const RANKING_SILVER = "Silver";
	const RANKING_GOLD = "Gold";
	const RANKING_PLATINUM = "Platinum";
	const RANKING_DIAMOND = "Diamond";

	const { http, user } = AuthUser();
	const dateFormat = 'DD/MM/YYYY';

	// Fetch acustomer info state
	const [customerInfo, setCustomerInfo] = useState();
	const [customerRanking, setCustomerRanking] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [imageUpload, setImageUpload] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const fileInputRef = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Create a reference from a Google Cloud Storage URI
	const avatar = useSelector(avatarSelector);

	const handleChangeAvatar = () => {
		document.getElementById('fileInput').click();
	}

	const handleCancel = () => {
		// Đặt giá trị của input thành null
		if (fileInputRef.current) {
			fileInputRef.current.value = null;
		}
	};

	const handleImageChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			if (selectedFile !== imageUpload) {
				toast.info(
					<ConfirmationToast
						message="Do you want to save avatar?"
						onConfirm={() => uploadImage(selectedFile)}
						onCancel={() => setImageUpload(handleCancel)}
					/>, {
					position: "top-center",
					closeOnClick: true,
					draggable: false,
					progress: 1,
					theme: "colored",
					style: { cursor: 'default' },
				})
			}
		}
	}

	const uploadImage = (file) => {
		// Gửi đường dẫn ảnh đến Laravel để lưu vào database
		// (Sử dụng API hoặc các phương thức khác để thực hiện tác vụ này)

		const avatarRef = ref(storage, `avatars/${file.name + v4()}`);
		uploadBytes(avatarRef, file).then(() => {
			getDownloadURL(avatarRef).then((url) => {
				// Upload ảnh lên Firebase Storage
				const formData = new FormData();

				formData.append('avatar_url', url);

				http.patch(`auth/accounts/${user.id}`, formData)
					.then((resolve) => {
						console.log(resolve);
						Swal.fire(
							'Update!',
							'You have successfully update your avatar',
							'success'
						).then(() => {
							dispatch(addAvatar(url));
							navigate(0);
						})
					})
					.catch((reject) => {
						console.log(reject);
					})
			})
		})
	}

	// ---------------------------  Set field for date input  ---------------------------
	const [form] = Form.useForm();

	const handleSelectBirthDate = (date, dateString) => {
		form.setFieldValue('birthDate', date);
	}

	const handleChange = () => {
		setOpenModal(true);
	}

	// Handle click out boundary of modal 
	const handleOk = () => {
		setOpenModal(false);
	}

	// Handle click button "X" of modal
	const handleCancelModal = () => {
		setOpenModal(false);
	}

	// Successful case
	const onFinish = (values) => {
		const { fullName, gender, birthDate, email, ID_Card, address, phone } = values;
		const formData = new FormData();

		formData.append('full_name', fullName);
		formData.append('gender', gender);
		formData.append('birthday', FormattedDate(birthDate));
		formData.append('email', email);
		formData.append('CMND', ID_Card);
		formData.append('address', address);
		formData.append('phone', phone);

		http.patch(`/customer/update-customer`, formData)
			.then(() => {
				Swal.fire(
					'Update!',
					'You have successfully update your profile',
					'success'
				).then(() => {
					navigate(0);
				})
			})
			.catch((reject) => {
				console.log(reject);
				toast.error('Oops. Try again', {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				})
			})
	}

	// Failed case
	const onFinishFailed = (error) => {
		console.log('Error: ', error)
		toast.error('Update failed!', {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		})
	}

	// ---------------------------      Modal Draggable      ---------------------------
	const draggleRef = useRef(null);
	const [disabled, setDisabled] = useState(false);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});

	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

	// --------------------------     Fetch API     --------------------------
	useEffect(() => {
		const fetchData = () => {
			http.get(`/customer/account-customer`)
				.then((resolve) => {
          console.log(resolve);
					setCustomerInfo(resolve.data.customer[0]);
          setCustomerRanking(resolve.data.customer[0].ranking_name);
				})
				.catch((reject) => {
					console.log(reject);
				})
		}

		fetchData();
		setIsLoading(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!isLoading) {
		return (
			<></>
		)
	} else {
		return (
			<div>
				<div className={cx("manage-account-wrapper")}>
					<Headers userInfo={user} imageUrl={avatar} />
					<div className={cx("manage-account-wrapper__top")}>
						<div className={cx("image-bg")} >
							<img
								src={background}
								alt="Background Manage Account"
							/>
						</div>
						<div className={cx("image-avatar")}>
							<div className={cx("avatar-container")}>
								<img
									src={avatar}
									alt="User Avatar"
								/>
								<button
									className={cx("btn-edit")}
									onClick={handleChangeAvatar}
								>
									<input
										type="file"
										id="fileInput"
										ref={fileInputRef}
										style={{ display: 'none' }}
										onChange={handleImageChange}
									/>
									<FontAwesomeIcon icon={faPen} />
								</button>
							</div>
							<h1>{user.username}</h1>
							<p>{user.email}</p>
						</div>
					</div>

					<div className={cx("manage-account-wrapper__bottom")}>
						<div className={cx("account-info-wrapper")}>
							<div className={cx("account-info-wrapper__top")}>
								<h1 className={cx("header")}>Account Information</h1>
								<button
									className={cx("btn-change")}
									onClick={handleChange}
								>
									<EditOutlined />
									<span>Change</span>
								</button>
							</div>
							<Divider className={cx("seperate-line")} />
							<div className={cx("account-info-wrapper__bottom")}>
								<div className={cx("info-container")}>
									<div className={cx("info-container__left")}>
										<div className={cx("title-text")}>Name</div>
										<div className={cx("content-text")}>{customerInfo?.name ?? "No information provided"}</div>
									</div>
									<div className={cx("info-container__right")}>
										{customerInfo?.name ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
									</div>
								</div>
								<div className={cx("info-container")}>
									<div className={cx("info-container__left")}>
										<div className={cx("title-text")}>Gender</div>
										<div className={cx("content-text")}>{customerInfo?.gender ?? "No information provided"}</div>
									</div>
									<div className={cx("info-container__right")}>
										{customerInfo?.gender ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
									</div>
								</div>
								<div className={cx("info-container")}>
									<div className={cx("info-container__left")}>
										<div className={cx("title-text")}>Date of birth</div>
										<div className={cx("content-text")}>{customerInfo?.birthday ?? "No information provided"}</div>
									</div>
									<div className={cx("info-container__right")}>
										{customerInfo?.birthday ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
									</div>
								</div>
								<div className={cx("info-container")}>
									<div className={cx("info-container__left")}>
										<div className={cx("title-text")}>ID Card</div>
										<div className={cx("content-text")}>{customerInfo?.CMND ?? "No information provided"}</div>
									</div>
									<div className={cx("info-container__right")}>
										{customerInfo?.CMND ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
									</div>
								</div>
								<div className={cx("info-container")}>
									<div className={cx("info-container__left")}>
										<div className={cx("title-text")}>Address</div>
										<div className={cx("content-text")}>{customerInfo?.address ?? "No information provided"}</div>
									</div>
									<div className={cx("info-container__right")}>
										{customerInfo?.address ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
									</div>
								</div>
								<div className={cx("info-container")}>
									<div className={cx("info-container__left")}>
										<div className={cx("title-text")}>Phone number</div>
										<div className={cx("content-text")}>{customerInfo?.phone ?? "No information provided"}</div>
									</div>
									<div className={cx("info-container__right")}>
										{customerInfo?.phone ? <FaCheckCircle /> : <FaInfoCircle style={{ color: 'grey' }} />}
									</div>
								</div>
								<div className={cx("info-container")}>
									<div className={cx("info-container__left")}>
										<div className={cx("title-text")}>Ranking point</div>
										<div className={cx("content-text")}>{customerInfo?.ranking_point ?? "No information provided"}</div>
									</div>
									<div className={cx("info-container__right")}>
										{(() => {
											if (customerRanking === RANKING_BRONZE) {
												return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#A77044' }} />
											}
											else if (customerRanking === RANKING_SILVER) {
												return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#D7D7D7' }} />
											}
											else if (customerRanking === RANKING_GOLD) {
												return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#FEE101' }} />
											}
											else if (customerRanking === RANKING_PLATINUM) {
												return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#79CCE4' }} />
											}
											else if (customerRanking === RANKING_DIAMOND) {
												return <Diamond style={{ fontSize: 40, marginRight: '-6px', color: '#225684' }} />
											}
										})()}
									</div>
								</div>
								<div className={cx("info-container")}>
									<div className={cx("info-container__left")}>
										<div className={cx("title-text")}>Password</div>
										<div className={cx("content-text")}>************</div>
									</div>
									<div className={cx("info-container__right")}>
										<FaCheckCircle />
									</div>
								</div>
							</div>
							<Modal
								title={
									<div
										style={{
											width: '100%',
											cursor: 'move',
											textAlign: 'center',
											marginBottom: 24
										}}
										onMouseOver={() => {
											setDisabled(false);
										}}
										onMouseOut={() => {
											setDisabled(true);
										}}
									>
										Update Profile
										<FaUser style={{ marginLeft: 16 }} />
									</div>
								}
								open={openModal}
								onOk={handleOk}
								onCancel={handleCancelModal}
								footer={null}
								modalRender={(modal) => (
									<Draggable
										disabled={disabled}
										bounds={bounds}
										onStart={(event, uiData) => onStart(event, uiData)}
									>
										<div ref={draggleRef}>{modal}</div>
									</Draggable>
								)}
							>
								<Form
									{...updateFormLayout}
									form={form}
									layout='horizontal'
									name='profile_form'
									labelAlign='right'
									labelWrap='true'
									size='large'
									autoComplete="off"
									onFinish={onFinish}
									onFinishFailed={onFinishFailed}
									className={cx("modal-form")}
									initialValues={{
										'fullName': customerInfo?.name,
										'gender': customerInfo?.gender,
										'birthDate': customerInfo?.birthday ? dayjs(customerInfo?.birthday) : dayjs(),
										'ID_Card': customerInfo?.CMND,
										'address': customerInfo?.address,
										'phone': customerInfo?.phone,
									}}
								>
									<Form.Item
										name='fullName'
										label="Full Name"
										rules={[
											{
												required: true,
												message: 'Full name is required!'
											},
										]}
										hasFeedback
									>
										<Input
											placeholder={customerInfo?.full_name}
										/>
									</Form.Item>
									<Form.Item
										name="gender"
										label="Gender"
										hasFeedback
										rules={[
											{
												required: true,
												message: 'Gender is required!',
											},
										]}
									>
										<Select placeholder="Please select gender">
											<Select.Option value="Male">Male</Select.Option>
											<Select.Option value="Female">Female</Select.Option>
											<Select.Option value="Other">Other</Select.Option>
										</Select>
									</Form.Item>
									<Form.Item
										label="Birth Date"
										name='birthDate'
										rules={[
											{
												required: true,
												message: 'Birth date is required!'
											}
										]}
										hasFeedback
									>
										<DatePicker
											placeholder='Select date'
											format={dateFormat}
											onChange={handleSelectBirthDate}
										/>
									</Form.Item>
									<Form.Item
										name='ID_Card'
										label="ID Card"
										rules={[
											{
												required: true,
												message: 'ID Card is required!'
											},
										]}
										hasFeedback
									>
										<Input
											placeholder='201801234'
										/>
									</Form.Item>
									<Form.Item
										name='address'
										label="Address"
										rules={[
											{
												required: true,
												message: 'Address is required!'
											},
										]}
										hasFeedback
									>
										<Input
											placeholder='Đà Nẵng'
										/>
									</Form.Item>
									<Form.Item
										name='phone'
										label="Phone"
										rules={[
											{
												required: true,
												message: 'Phone is required!'
											},
										]}
										hasFeedback
									>
										<Input
											placeholder='0905000001'
										/>
									</Form.Item>
									<Form.Item
										wrapperCol={24}
									>
										<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<Button type="primary" htmlType="submit">
												Submit
											</Button>
										</div>
									</Form.Item>
								</Form>
							</Modal>
						</div>
					</div>

					<Footer />
				</div>
			</div>
		);
	}
}

export default UserProfile