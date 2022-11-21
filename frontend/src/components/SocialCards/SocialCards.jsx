import {
  Card,
  Col,
  Image,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";

import { API, AVATAR_API } from "../../constant";

const SocialCards = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users`);
      const data = await response.json();
      setProfiles(data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching profiles!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (isLoading) {
    return <Spin size="small" />;
  }

  return (
    <Row gutter={[32, 32]}>
      {profiles.map((profile, index) => (
        <Col md={4} lg={4} sm={24} xs={24} key={`${profile.id}_${index}`}>
          <Card className="social_card" 
            style={{ marginBottom:35 }}
            align="center"
            size="small"
            bordered={true}

          >
            <Image
              className="social_image"
              preview={false}
              src={
                profile.avatar_url ??
                `${AVATAR_API}?name=${profile.username}&background=1890ff&color=fff`
              }
            />
            <Typography.Title></Typography.Title>
            <Typography.Title level={5}>{profile.username}</Typography.Title>
            <Typography.Paragraph>{profile.about}</Typography.Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SocialCards;