import { IdcardOutlined, ProfileOutlined } from "@ant-design/icons";
import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { Header } from "@/components/header";
import { ENDPOINT_URL, RESOURCES_NAME } from "@/configs/constants";
import { AlbumList, AlbumShow } from "@/pages/albums";
import { UserList, UserShow } from "@/pages/users";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import logo from "@/assets/images/geekup-logo-general.svg";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider(
                ENDPOINT_URL || "https://jsonplaceholder.typicode.com"
              )}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: RESOURCES_NAME.albums.root,
                  list: RESOURCES_NAME.albums.list,
                  show: RESOURCES_NAME.albums.show,
                  meta: {
                    label: "Albums",
                    pageSize: 20,
                    icon: <ProfileOutlined />,
                  },
                },
                {
                  name: RESOURCES_NAME.users.root,
                  list: RESOURCES_NAME.users.list,
                  show: RESOURCES_NAME.users.show,
                  meta: {
                    label: "Users",
                    icon: <IdcardOutlined />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "YJTr0W-EKcm65-IXE2jF",
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2
                      Header={() => <Header sticky />}
                      Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    index
                    element={
                      <NavigateToResource
                        resource={RESOURCES_NAME.albums.root}
                      />
                    }
                  />
                  <Route path={RESOURCES_NAME.albums.root}>
                    <Route index element={<AlbumList />} />
                    <Route path="show/:id" element={<AlbumShow />} />
                  </Route>
                  <Route path={RESOURCES_NAME.users.root}>
                    <Route index element={<UserList />} />
                    <Route path="show/:id" element={<UserShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
