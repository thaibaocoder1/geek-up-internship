import type { User } from "@/types/user.type";
import { generateNameBasedAvatar } from "@/utils/image";
import { AntDesignOutlined } from "@ant-design/icons";
import { List, ShowButton, useTable } from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Avatar, Space, Table, TableProps } from "antd";

const columns: TableProps<User>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Avatar",
    dataIndex: "name",
    key: "avatar",
    render(value: string) {
      return (
        <Avatar
          src={generateNameBasedAvatar(value)}
          icon={<AntDesignOutlined />}
        />
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render(value: string) {
      return <a href={`mailto:${value}`}>{value}</a>;
    },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render(value: string) {
      return <a href={`tel:${value}`}>{value}</a>;
    },
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    render(value: string) {
      return (
        <a href={`https://${value}`} target="_blank" rel="noreferrer">
          {value}
        </a>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record: BaseRecord) => (
      <Space>
        <ShowButton size="small" recordItemId={record.id} />
      </Space>
    ),
  },
];

export const UserList = () => {
  const { tableProps } = useTable<User>({
    pagination: {
      mode: "off",
    },
  });

  return (
    <List>
      <Table columns={columns} {...tableProps} rowKey={"id"} />
    </List>
  );
};
