import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../utils/theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../../data/mockData";
import AuthUser from "../../utils/AuthUser";

const PieChart = (datas = []) => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorss = [
    tokens("dark").redAccent[100],
    tokens("dark").grey[200],
    tokens("dark").blueAccent[500],
    tokens("dark").greenAccent[400],
    tokens("else").redAccent[500],
    tokens("else").greenAccent[200],
    tokens("else").blueAccent[200],
  ];

  const { http } = AuthUser();
  const [listEmployee, setListEmployee] = useState([]);
  // fetch api
  useEffect(() => {
    const fetchData = () => {
      http
        .get(`/admin/list-department`)
        .then((resolve) => {
          setListEmployee(resolve.data.list_department);
        })
        .catch((reject) => {
          console.log(reject);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const newListEmployeebase = [
    { id: '0', name: '0', total: 0 },
    { id: '1', name: '0', total: 0 },
    { id: '2', name: '0', total: 0 }
  ];
  let newListEmployee;
  const data = datas.datas[0];
  if (data) {
    newListEmployee = data.map((employee) => {
      return {
        id: employee.id,
        label: employee.id,
        value: employee.total,
      };
    });
  }

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <ResponsivePie
        data={data ? newListEmployee : newListEmployeebase}
        colors={colorss}
        margin={{ top: 40, right: 0, bottom: 80, left: 200 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: -250,
            translateY: -75,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
