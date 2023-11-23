import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { CredentialResponse } from '@react-oauth/google';
import { signUp } from "@/stores/customer.stores";
import { useDispatch } from "react-redux";
import {  setSignupModal } from "@/redux/layoutSlice";

const SignUpModal = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const formInitialValue = {
        email: "",
        password: "",
        rePassword: "",
    }
    const handleSignUp = async (res: CredentialResponse) => {
        try {
            const result = await signUp({ email: form.getFieldValue("email"), password: form.getFieldValue("password") })
            message.success(result?.message || "Đăng kí thất bại vui lòng thử lại")
            dispatch(setSignupModal(false))
        } catch (error: any) {
            message.error(error.response?.data?.message || error.response?.data)
        }
    }

    return (
        <div className="login-modal mt-6">
            <Form
                form={form}
                initialValues={formInitialValue}
                onFinish={handleSignUp}
            >
                <Form.Item rules={[{ type: 'email', required: true, message: "Email là bắt buộc" }]} name={'email'}>
                    <Input className="h-10" placeholder="Nhập email" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item rules={[{ min: 6, required: true, message: "Password là bắt buộc" }]} name={'password'}>
                    <Input className="h-10" type="password" placeholder="Nhập password" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item dependencies={['password']} rules={[
                    {
                        required: true,
                        message: 'Hãy nhập lại mật khẩu',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                        },
                    }),
                ]} name={'rePasswrod'}>
                    <Input className="h-10" type="password" placeholder="Nhập lại mật khẩu" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item className="mb-2">
                    <Button htmlType="submit" className="w-full button-submit-login h-10">Đăng ký</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SignUpModal