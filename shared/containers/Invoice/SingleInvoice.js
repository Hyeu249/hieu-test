import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, useParams } from "react-router-dom";
import EditInvoice from "./EditInvoice";
import ViewInvoice from "./ViewInvoice";
import Loader from "@iso/components/utility/loader";
import invoiceActions from "@iso/redux/invoice/actions";
const { initData, selectCurrentInvoice, toggleView } = invoiceActions; // -----> actions
export default function SingleInvoice() {
  const invoices = useSelector((state) => state.Invoices); // -----> invoices
  const dispatch = useDispatch();
  const match = useRouteMatch(); // -----> current path
  const { invoiceId } = useParams();
  const { initialInvoices, currentInvoice, enableEditView } = invoices;
  React.useEffect(() => {
    if (!initialInvoices) {
      dispatch(initData());
    }
    toggleCreatedInvoice();
  });
  // componentWillReceiveProps(nextProps) {
  //   this.toggleCreatedInvoice(nextProps);
  // }

  function toggleCreatedInvoice() {
    if (initialInvoices && currentInvoice.id !== invoiceId) {
      dispatch(selectCurrentInvoice(invoiceId));
    }
  }
  const redirectPath = match.url.replace(invoiceId, "");
  if (currentInvoice.id !== invoiceId) {
    return <Loader />;
  } else if (enableEditView) {
    return (
      <EditInvoice
        toggleView={(data) => dispatch(toggleView(data))}
        {...invoices}
        redirectPath={redirectPath}
      />
    );
  } else {
    return (
      <ViewInvoice
        {...invoices}
        toggleView={(data) => dispatch(toggleView(data))}
        redirectPath={redirectPath}
      />
    );
  }
}
