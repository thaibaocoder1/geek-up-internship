import { ImagePreview } from "@/components";
import { RESOURCES_NAME } from "@/configs/constants";
import { Album } from "@/types/album.type";
import { Photo } from "@/types/photo.type";
import { User } from "@/types/user.type";
import { generateNameBasedAvatar } from "@/utils/image";
import { Show } from "@refinedev/antd";
import { HttpError, useList, useOne, useShow } from "@refinedev/core";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Row,
  Space,
  Typography,
  Image,
} from "antd";
import { Link } from "react-router";

const { Title, Text } = Typography;

export const AlbumShow = () => {
  const { query } = useShow<Album>();
  const { data, isLoading } = query;
  const record = data?.data;

  const { data: userData, isLoading: userIsLoading } = useOne<User, HttpError>({
    id: record?.userId,
    resource: RESOURCES_NAME.users.root,
    queryOptions: {
      enabled: !!record?.userId,
    },
  });

  const { data: photosData, isLoading: photosIsLoading } = useList<
    Photo,
    HttpError
  >({
    resource: RESOURCES_NAME.photos.root,
    filters: [
      {
        field: "albumId",
        operator: "eq",
        value: record?.id,
      },
    ],
    queryOptions: {
      enabled: !!record?.id,
    },
  });

  const isAllReady =
    !isLoading &&
    !userIsLoading &&
    !photosIsLoading &&
    !!record &&
    !!userData?.data &&
    !!photosData?.data;

  if (!isAllReady) {
    return (
      <Card>
        <Show isLoading />
      </Card>
    );
  }

  const imageList = photosData.data.map(({ title, thumbnailUrl, id }) => ({
    title,
    thumbnailUrl,
    id,
  }));

  return (
    <Show>
      <Card>
        <Space direction="horizontal" align="start" style={{ gap: 16 }}>
          <Avatar src={generateNameBasedAvatar(userData.data.name)} />
          <Space direction="vertical" size="small">
            <Link
              style={{
                fontSize: 16,
                fontWeight: 600,
                display: "inline-block",
              }}
              to={`/users/show/${userData.data.id}`}
              replace
            >
              {userData.data.name}
            </Link>
            <Text>
              <Button
                type="link"
                href={`mailto:${userData.data.email}`}
                target="_blank"
                rel="noreferrer"
              >
                {userData.data.email}
              </Button>
            </Text>
          </Space>
        </Space>
        <Divider />
        <Title level={4} style={{ marginBottom: 10 }}>
          {record.title}
        </Title>
        <Image.PreviewGroup>
          <Row gutter={[16, 16]}>
            <ImagePreview imageList={imageList} />
          </Row>
        </Image.PreviewGroup>
      </Card>
    </Show>
  );
};
