import type { Album } from "@/types/album.type";
import type { User } from "@/types/user.type";
import { generateAvatarBaseName } from "@/utils/image";
import { List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord, HttpError, useMany, useResource } from "@refinedev/core";
import { Avatar, Space, Table, TableProps, Typography } from "antd";

const { Text } = Typography;

const columns = (users: Record<number, User>): TableProps<Album>["columns"] => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "User",
    dataIndex: "userId",
    render: (value: number) => {
      const user = users?.[value];
      if (!user) return "Loading...";
      return (
        <Space>
          <Avatar src={generateAvatarBaseName(user.name)} />
          <Text>{user.name}</Text>
        </Space>
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record: BaseRecord) => (
      <Space>
        <ShowButton size="small" recordItemId={record.id} />
      </Space>
    ),
  },
];

export const AlbumList = () => {
  const { resource } = useResource();

  const { tableProps } = useTable<Album, HttpError>({
    pagination: {
      pageSize: resource?.meta?.pageSize ?? 10,
    },
  });

  const userIds = tableProps?.dataSource?.map((item) => item.userId) || [];

  const { data: usersData } = useMany<User, HttpError>({
    resource: "users",
    ids: [...new Set(userIds)],
  });

  const usersMap =
    usersData?.data.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<number, User>) || {};

  return (
    <List>
      <Table columns={columns(usersMap)} rowKey="id" {...tableProps} />
    </List>
  );
};
