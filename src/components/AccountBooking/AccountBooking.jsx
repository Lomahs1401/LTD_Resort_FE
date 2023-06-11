import React, { useState, useEffect, useRef } from 'react'
import styles from './AccountBooking.module.scss'
import classNames from "classnames/bind";
import { useTheme } from "@mui/material";
import { tokens } from "../../utils/theme";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Form, Steps, Typography, Modal, Button, Input, Rate } from 'antd';
import { MdHotel, MdRoomService } from "react-icons/md";
import AuthUser from '../../utils/AuthUser';
import currency from '../../utils/currency';
import { RiBillFill, RiFeedbackFill } from 'react-icons/ri';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextArea from 'antd/es/input/TextArea';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const AccountBooking = () => {
  const loginFormLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
  };
  const RATING_DESC = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
  const { http } = AuthUser();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [current, setCurrent] = useState(0);
  const [openModalBillRoom, setOpenModalBillRoom] = useState(false);
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const [form] = Form.useForm();
  const [roomTypeId, setRoomTypeId] = useState();

  const navigate = useNavigate();

  const [listBillRooms, setListBillRooms] = useState([]);
  const [listBillRoomDetails, setListBillRoomDetails] = useState([]);
  const [listBillServices, setListBillServices] = useState([]);
  const [listBillExtraServices, setListBillExtraServices] = useState([]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const onChange = (value) => {
    setCurrent(value);
  };

  const handleDoubleClickCellRoom = (params) => {
    const { row } = params;
    console.log(row);

    http.get(`/auth/show-bill-room-detail/${row.id}`)
      .then((resolve) => {
        console.log(resolve);
        setListBillRoomDetails(resolve.data.bill_room_detail);
      })
      .catch((reject) => {
        console.log(reject);
      })

    setOpenModalBillRoom(true);
  };

  const handleDoubleClickCellService = (params) => {
    const { row } = params;
    console.log(row);
  };

  const handleDoubleClickCellExtraService = (params) => {
    const { row } = params;
    console.log(row);
  };

  const handleOpenModalBillRoom = () => {
    setOpenModalBillRoom(false);
  };

  // Handle click button "X" of modal
  const handleCancelModalBillRoom = () => {
    setOpenModalBillRoom(false);
  };

  const handleOpenModalFeedback = () => {
    setOpenModalFeedback(true);
  }

  const handleCancelModalFeedback = () => {
    setOpenModalFeedback(false);
  }

  const handleViewDetailClick = (params) => {
    const { row } = params;
    http.get(`/auth/show-bill-room-detail/${row.id}`)
      .then((resolve) => {
        console.log(resolve);
        setListBillRoomDetails(resolve.data.bill_room_detail);
      })
      .catch((reject) => {
        console.log(reject);
      })
      
    setOpenModalBillRoom(true);
  }

  const handleCommentClick = (params) => {
    const { row } = params;
    console.log(row);
    setOpenModalFeedback(true);
    setRoomTypeId(row.room_type_id);
  }

  const submitForm = (values) => {
    console.log('Values: ', values);
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('rating', values.rate);
    formData.append('comment', values.comment);

    http.post(`/customer/store-feedback-room/${roomTypeId}`, formData)
      .then((resolve) => {
        console.log(resolve);
        Swal.fire(
          'Successfully feedbacked!',
          'Thank you for your feedback!',
          'success'
        ).then(() => {
          navigate(1);
        })
      })
      .catch((reject) => {
        console.log(reject);
      })
  }

  const submitFormFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error('Please input all fields', {
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


  //data columns
  const columnBillRooms = [
    {
      field: "id",
      headerName: "Bill ID",
      flex: 0.5,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.id}
        </Typography>
      ),
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {currency(params.row.total_amount)}
        </Typography>
      ),
    },
    {
      field: "total_room",
      headerName: "Total Room",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.total_room}
        </Typography>
      ),
    },
    {
      field: "total_people",
      headerName: "Total People",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.total_people}
        </Typography>
      ),
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.payment_method}
        </Typography>
      ),
    },
    {
      field: "time_start",
      headerName: "Checkin Date",
      flex: 1.5,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.time_start}
        </Typography>
      ),
    },
    {
      field: "time_end",
      headerName: "Checkout Date",
      flex: 1.5,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.time_end}
        </Typography>
      ),
    },
    {
      field: "tax",
      headerName: "Tax",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.tax}
        </Typography>
      ),
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.discount}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        const viewDetailClick = () => {
          handleViewDetailClick(params);
        };

        return (
          <div className={cx("action-wrapper")}>
            <button
              className={cx("btn-action")}
              onClick={viewDetailClick}
            >
              <RiBillFill size={20} />
            </button>
          </div>
        )
      },
    },
  ];

  const columnBillRoomDetail = [
    {
      field: "id",
      headerName: "Room ID",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.id}
        </Typography>
      ),
    },
    {
      field: "room_name",
      headerName: "Room Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.room_name}
        </Typography>
      ),
    },
    {
      field: "room_type",
      headerName: "Room Type",
      flex: 2,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.room_type}
        </Typography>
      ),
    },
    {
      field: "area",
      headerName: "Area",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.area}
        </Typography>
      ),
    },
    {
      field: "floor",
      headerName: "Floor",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {currency(params.row.floor)}
        </Typography>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {currency(params.row.price)}
        </Typography>
      ),
    },
    {
      field: "point_ranking",
      headerName: "Point Ranking",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.point_ranking}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        const commentClick = () => {
          handleCommentClick(params);
        };

        return (
          <div className={cx("action-wrapper")}>
            <button
              className={cx("btn-action")}
              onClick={commentClick}
            >
              <RiFeedbackFill size={20} />
            </button>
          </div>
        )
      },
    },
  ]

  const columnBillServices = [
    {
      field: "id",
      headerName: "Bill ID",
      flex: 0.5,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.id}
        </Typography>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.quantity}
        </Typography>
      ),
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.total_amount}
        </Typography>
      ),
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.payment_method}
        </Typography>
      ),
    },
    {
      field: "tax",
      headerName: "Tax",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.tax}
        </Typography>
      ),
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.discount}
        </Typography>
      ),
    },
  ];

  const columnBillExtraServices = [
    {
      field: "id",
      headerName: "Bill ID",
      flex: 0.5,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.id}
        </Typography>
      ),
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {currency(params.row.total_amount)}
        </Typography>
      ),
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.payment_method}
        </Typography>
      ),
    },
    {
      field: "tax",
      headerName: "Tax",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.tax}
        </Typography>
      ),
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.discount}
        </Typography>
      ),
    },
  ];

  const items = [
    {
      title: "Room",
      content: (
        <DataGrid
          onCellDoubleClick={handleDoubleClickCellRoom}
          rows={listBillRooms}
          columns={columnBillRooms}
          components={{ Toolbar: CustomToolbar }}
          className={cx("table")}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      ),
      icon: <MdHotel />,
    },
    {
      title: "Service",
      content: (
        <DataGrid
          onCellDoubleClick={handleDoubleClickCellService}
          rows={listBillServices}
          columns={columnBillServices}
          components={{ Toolbar: CustomToolbar }}
          className={cx("table")}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      ),
      icon: <MdRoomService />,
    },
    {
      title: "Extra Service",
      content: (
        <DataGrid
          checkboxSelection
          onCellDoubleClick={handleDoubleClickCellExtraService}
          rows={listBillExtraServices}
          columns={columnBillExtraServices}
          components={{ Toolbar: CustomToolbar }}
          className={cx("table")}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      ),
      icon: <MdRoomService />,
    },
  ];

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

  useEffect(() => {
    const fetchData = () => {
      http.get('/customer/history-bill-customer')
        .then((resolve) => {
          console.log(resolve);
          if (resolve.data.status === 404) {
            setListBillRooms([]);
            setListBillServices([]);
            setListBillExtraServices([]);
          } else if (resolve.data.status === 200) {
            setListBillRooms(resolve.data.bill_room);
            setListBillServices(resolve.data.bill_service);
            setListBillExtraServices(resolve.data.bill_extra_service);
          }
        })
        .catch((reject) => {
          console.log(reject);
        })

    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      m="10px 0 0 0"
      height="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <Steps
        current={current}
        items={items}
        type="navigation"
        onChange={onChange}
      />
      <div>
        <div className={cx("content")}>
          {items[current].content}
        </div>
      </div>
      <Modal
        title={
          <div
            style={{
              width: '100%',
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
            Bill Detail Info
            <DataGrid
              onCellDoubleClick={handleDoubleClickCellExtraService}
              rows={listBillRoomDetails}
              columns={columnBillRoomDetail}
              components={{ Toolbar: CustomToolbar }}
              className={cx("table")}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
            />
          </div>
        }
        open={openModalBillRoom}
        onOk={handleOpenModalBillRoom}
        onCancel={handleCancelModalBillRoom}
        footer={null}
        className={cx("modal")}
      >
      </Modal>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move'
            }}
            onMouseOver={() => {
              setDisabled(false);
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            <div className={cx("comment-header")}>
              <RiFeedbackFill size={30} />
              <h1>Give your feedback here</h1>
              <RiFeedbackFill size={30} />
            </div>
            <div className={cx("comment-wrapper")}>
              <Form
                {...loginFormLayout}
                form={form}
                layout='vertical'
                name='comment_form'
                labelAlign='left'
                labelWrap='true'
                size='large'
                autoComplete="off"
                onFinish={submitForm}
                onFinishFailed={submitFormFailed}
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Title is required!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Enter title' />
                </Form.Item>
                <Form.Item 
                  name="rate" 
                  label="Rate"
                  rules={[
                    {
                      required: true,
                      message: 'Rating is required!',
                    },
                  ]}
                  hasFeedback
                >
                  <Rate 
                    tooltips={RATING_DESC}
                    style={{ color: "#FF8682" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Comment"
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: 'Comment is required!',
                    },
                  ]}
                  hasFeedback
                >
                  <TextArea rows={4} placeholder='Enter comment' />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" style={{float: 'right'}}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        }
        open={openModalFeedback}
        onOk={handleOpenModalFeedback}
        onCancel={handleCancelModalFeedback}
        footer={null}
        className={cx("modal")}
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
      </Modal>
    </Box>
  )
}

export default AccountBooking