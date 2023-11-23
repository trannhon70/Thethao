import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { googleLogin, loginNormal } from "@/stores/customer.stores";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { setLoginModal, setSignupModal } from "@/redux/layoutSlice";

const LoginModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formInitialValue = {
    email: "",
    password: "",
  };

  const openSignUpModal = () => {
    dispatch(setLoginModal(false));
    dispatch(setSignupModal(true));
  };

  const handleLoginGoogle = async (res: CredentialResponse) => {
    try {
      const result = await googleLogin(res.credential || "");
      if (result?.user) {
        dispatch(login(result));
        dispatch(setLoginModal(false));
        message.success("Đăng nhập thành công");
        return;
      }

      message.error("Đăng nhập thất bại");
    } catch (error: any) {
      console.log(error);
      message.error(error.response?.data?.message || error.response?.data);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await loginNormal({
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
      });
      if (result?.user) {
        dispatch(login(result));
        dispatch(setLoginModal(false));
        message.success("Đăng nhập thành công");
        return;
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.response?.data?.message || error.response?.data);
    }
  };

  return (
    <div className="mt-6 login-modal">
      <Form form={form} initialValues={formInitialValue} onFinish={handleLogin}>
        <Form.Item
          rules={[
            { type: "email", required: true, message: "Email là bắt buộc" },
          ]}
          name={"email"}
        >
          <Input
            className="h-10"
            type="email"
            placeholder="Nhập email"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          rules={[{ min: 6, required: true, message: "Mật khẩu là bắt buộc" }]}
          name={"password"}
        >
          <Input
            className="h-10"
            type="password"
            placeholder="Nhập password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item className="mb-2">
          <Button htmlType="submit" className="w-full h-10 button-submit-login">
            <span style={{ color: "white" }}>Đăng nhập</span>
          </Button>
        </Form.Item>
        <a className="text-blue-600">Quên mật khẩu?</a>
      </Form>
      <Button
        className="w-full h-10 mt-2 font-bold bg-slate-100 button-sign-up"
        onClick={openSignUpModal}
      >
        Đăng ký
      </Button>
      <div className="w-full mt-4">
        <div>
          <GoogleLogin size="large" onSuccess={handleLoginGoogle} />
        </div>
        {/* <button style={{width:'50%', background:'red'}}>Đăng nhập Facebook</button> */}
      </div>
    </div>
  );
};

export default LoginModal;
