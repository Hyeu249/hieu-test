import React from "react";
import { useDispatch, useSelector } from "react-redux";
import contactActions from "@iso/redux/contacts/actions";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Button from "@iso/components/uielements/button";
import ContactList from "@iso/components/Contacts/ContactList";
import SingleContactView from "@iso/components/Contacts/SingleView";
import EditContactView from "@iso/components/Contacts/EditView";
import DeleteButton from "@iso/components/Contacts/DeleteButton";
import { otherAttributes } from "./data";
import IntlMessages from "@iso/components/utility/intlMessages";
import { ContactsWrapper } from "./Contacts.styles";
import Scrollbar from "@iso/components/utility/customScrollBar";

import BaoHieu from "@iso/containers/BaoHieu/BaoHieu";

const { changeContact, addContact, editContact, deleteContact, viewChange } =
  contactActions;

const { Content } = Layout;
export default function Contacts() {
  const { contacts, selectedId, editView } = useSelector(
    (state) => state.Contacts
  );

  const dispatch = useDispatch();

  const selectedContact = selectedId
    ? contacts.filter((contact) => contact.id === selectedId)[0]
    : null;

  const onVIewChange = () => {
    dispatch(viewChange(!editView));
  };

  contacts.forEach((data, index) => {
    data.city = index + "DaNang";
    data.street = index + "lyThuongKiet";
    data.key = data.id;
  });
  const contactsData = {
    getAll: () => contacts,
    getSortAsc: () => console.log("SortAsc"),
    getSortDesc: () => console.log("SortDesc"),
  };

  console.log("contacts: ", contactsData.getAll());

  return (
    <ContactsWrapper
      className="isomorphicContacts"
      style={{ background: "none" }}
    >
      <div className="isoContactListBar">
        <ContactList
          contacts={contacts}
          selectedId={selectedId}
          changeContact={(id) => dispatch(changeContact(id))}
          deleteContact={(e) => dispatch(deleteContact(e))}
        />
      </div>
      <Layout className="isoContactBoxWrapper">
        {selectedContact ? (
          <Content className="isoContactBox">
            <div className="isoContactControl">
              <Button type="default" onClick={onVIewChange}>
                {editView ? <CheckOutlined /> : <EditOutlined />}
              </Button>
              <DeleteButton
                deleteContact={(id) => dispatch(deleteContact(id))}
                contact={selectedContact}
              />
              <Button
                type="primary"
                onClick={() => dispatch(addContact())}
                className="isoAddContactBtn"
              >
                <IntlMessages id="contactlist.addNewContact" />
              </Button>
            </div>

            <Scrollbar className="contactBoxScrollbar">
              {editView ? (
                <EditContactView
                  contact={selectedContact}
                  editContact={(contact) => dispatch(editContact(contact))}
                  otherAttributes={otherAttributes}
                />
              ) : (
                <SingleContactView
                  contact={selectedContact}
                  otherAttributes={otherAttributes}
                />
              )}
            </Scrollbar>
          </Content>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              backgroundColor: "red",
              alignItems: "center",
            }}
          >
            {/* <div className="isoContactControl"> */}
            {/* <Button
              type="primary"
              onClick={() => dispatch(addContact())}
              className="isoAddContactBtn"
              style={{ padding: "100px", borderRadius: "10px" }}
            >
              <IntlMessages id="contactlist.addNewContact" />
            </Button> */}
            <BaoHieu data={contactsData} />
          </div>
        )}
      </Layout>
    </ContactsWrapper>
  );
}
