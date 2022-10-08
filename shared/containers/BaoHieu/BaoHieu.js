import React from "react";
import Tabs, { TabPane } from "@iso/components/uielements/tabs";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import TableDemoStyle from "@iso/containers/Tables/AntTables/Demo.styles";
import * as TableViews from "@iso/containers/Tables/AntTables/TableViews/TableViews";
import { tableinfos } from "./configs";
import fakeData from "@iso/containers/Tables/data";

const BaoHieu = ({ data }) => {
  const dataList = new fakeData(5);
  function renderTable(tableInfo, data = dataList) {
    let Component;
    switch (tableInfo.value) {
      case "sortView":
        Component = TableViews.SortView;
        break;
      case "filterView":
        Component = TableViews.FilterView;
        break;
      case "editView":
        Component = TableViews.EditView;
        break;
      case "groupView":
        Component = TableViews.GroupView;
        break;
      case "customizedView":
        Component = TableViews.CustomizedView;
        break;
      default:
        Component = TableViews.SimpleView;
    }
    return <Component tableInfo={tableInfo} dataList={data} />;
  }

  // return (
  //   <LayoutContentWrapper>
  //     <TableDemoStyle className="isoLayoutContent">
  //       <Tabs className="isoTableDisplayTab">
  //         {/*  simple, sortView, filterView, editView, groupView, customizedView*/}
  //         {tableinfos.sortView.map((tableInfo) => (
  //           <TabPane tab={tableInfo.title} key={tableInfo.value}>
  //             {renderTable(tableInfo)}
  //           </TabPane>
  //         ))}
  //       </Tabs>
  //     </TableDemoStyle>
  //   </LayoutContentWrapper>
  // );
  return (
    <TableDemoStyle className="isoLayoutContent">
      <Tabs className="isoTableDisplayTab">
        {/*  simple, sortView, filterView, editView, groupView, customizedView*/}
        {tableinfos.sortView.map((tableInfo) => (
          <TabPane tab={tableInfo.title} key={tableInfo.value}>
            {renderTable(tableInfo, data)}
          </TabPane>
        ))}
      </Tabs>
    </TableDemoStyle>
  );
};

export default BaoHieu;
