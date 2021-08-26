import React, { useState } from 'react';
import { Card, Drawer } from 'antd';

import JwtForm, { JwtFormData } from '../../components/jwt-form';
import Details from '../../containers/details';
import Search, { Customer } from '../../containers/search';

export default function HomePage(): React.ReactElement {
  const [jwtFormData, setJwtFormData] = useState<JwtFormData>();
  const [selectedCustomer, selectCustomer] = useState<Customer>();
  const [selectedVisible, setSelectedVisible] = useState<boolean>(false);

  const { jwt } = jwtFormData || { jwt: '' };

  const onSelectCustomer = (cust: Customer) => {
    selectCustomer(cust);
    setSelectedVisible(true);
  };

  return (
    <Card>
      <JwtForm onFinish={setJwtFormData} />
      <Search jwt={jwt} onSelect={onSelectCustomer} />
      {selectedCustomer && (
        <Drawer
          title={`${selectedCustomer.first_name} ${selectedCustomer.last_name}`}
          placement="right"
          closable
          onClose={() => setSelectedVisible(false)}
          visible={selectedVisible}
          width="50%"
        >
          <Details jwt={jwt} _id={selectedCustomer._id} />
        </Drawer>
      )}
    </Card>
  );
}