import { RESOURCES_NAME } from "@/configs/constants";
import type { Album } from "@/types/album.type";
import { generateAvatarBaseName } from "@/utils/image";
import { EyeOutlined } from "@ant-design/icons";
import { Show, ShowButton, useTable } from "@refinedev/antd";
import { HttpError, useShow } from "@refinedev/core";
import { Avatar, Button, Card, Divider, Space, Table, Typography } from "antd";

const { Title, Text } = Typography;

export const UserShow = () => {
  const { query } = useShow();
  const { data: userData, isLoading: userIsLoading } = query;
  const user = userData?.data;

  const shouldRenderAlbums = !!user?.id;

  return (
    <Show isLoading={userIsLoading}>
      <Card>
        <Space direction="horizontal" align="start" style={{ gap: 16 }}>
          <Avatar src={generateAvatarBaseName(user?.name || "")} />
          <Space direction="vertical" size="small">
            <Text style={{ fontSize: 16, fontWeight: 500 }}>{user?.name}</Text>
            <Text>
              <Button
                type="link"
                href={`mailto:${user?.email}`}
                target="_blank"
                rel="noreferrer"
              >
                {user?.email}
              </Button>
            </Text>
          </Space>
        </Space>

        <Divider />
        <Title level={4}>Albums</Title>

        {shouldRenderAlbums && <AlbumsTable userId={user.id as number} />}
      </Card>
    </Show>
  );
};

const AlbumsTable = ({ userId }: { userId: number }) => {
  const { tableProps } = useTable<Album, HttpError>({
    resource: RESOURCES_NAME.albums.root,
    filters: {
      permanent: [
        {
          field: "userId",
          operator: "eq",
          value: userId,
        },
      ],
    },
    pagination: {
      mode: "off",
    },
  });

  return (
    <Table
      {...tableProps}
      rowKey="id"
      columns={[
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (_, record) => (
            <Space>
              <ShowButton
                icon={<EyeOutlined />}
                size="small"
                recordItemId={record.id}
                resource={RESOURCES_NAME.albums.root}
              />
            </Space>
          ),
        },
      ]}
    />
  );
};
