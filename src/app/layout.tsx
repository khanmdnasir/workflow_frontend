import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Providers } from '@/store/provider';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry><Providers>{children}</Providers></AntdRegistry>
    </body>
  </html>
);

export default RootLayout;