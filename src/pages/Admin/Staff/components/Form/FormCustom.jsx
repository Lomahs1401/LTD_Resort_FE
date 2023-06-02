import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const FormCustom = ({ create = false, data}) => {
  console.log('data', data)
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
      <div>
              <Input value={data?.full_Name}/>
              <Input value={data?.age} />
              <Input value={data?.email} />
      </div>
  )
}

export default FormCustom;