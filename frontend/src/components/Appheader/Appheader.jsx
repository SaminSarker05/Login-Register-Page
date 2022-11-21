import { Button, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import { message } from "antd";

const AppHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    message.success("Logged out!");
    removeToken();
    navigate("/signin", { replace: true });
  };

  return (
    <Space className="header_space"
      
    >
      <Button className="header_space_brand" href="/" type="link" >
        Home
      </Button>
      <Space className="auth_buttons">
        {user ? (
          <>
            <Button className="auth_button_login" href="/profile" type="link">
              {user.username}
            </Button>
            <Button
              className="auth_button_login"
              type="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button className="auth_button_login" href="/signin" type="link">
              Login
            </Button>
            <Button className="auth_button_login" href="/signup" type="link"
            >
              Register
            </Button>
          </>
        )}
      </Space>
    </Space>
  );
};

export default AppHeader;