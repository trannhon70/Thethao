import { Button, Form, Input, message } from "antd";
import { LockOutlined } from '@ant-design/icons'
import { changePassword, signUp } from "@/stores/customer.stores";
import { useDispatch } from "react-redux";
import { setChangePasswordModal } from "@/redux/layoutSlice";

const ChangePasswordModal = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const formInitialValue = {
        password: "",
        newPassword: ""
    }

    const handleChangePassword = async () => {
        try {
            const result = await changePassword({ password: form.getFieldValue("password"), newPassword: form.getFieldValue("newPassword") })
            dispatch(setChangePasswordModal(false))
            message.success(result?.message || "Đổi mật khẩu thất bại, vui lòng thử lại")
        } catch (error: any) {
            console.log(error)
            message.error(error.response?.data?.message || error.response?.data)
        }
    }


    return (
        <div className="login-modal mt-6">
            <Form
                form={form}
                initialValues={formInitialValue}
                onFinish={handleChangePassword}
            >
                <Form.Item rules={[{ min: 6, required: true, message: "Password là bắt buộc" }]} name={'password'}>
                    <Input className="h-10" type="password" placeholder="Nhập password" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Hãy nhập mật khẩu mới',
                    },
                ]} name={'newPassword'}>
                    <Input className="h-10" type="password" placeholder="Nhập mật khẩu mới" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item className="mb-2">
                    <Button htmlType="submit" className="w-full button-submit-login h-10">Đổi mật khẩu</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangePasswordModal