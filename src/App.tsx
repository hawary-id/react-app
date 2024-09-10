import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Layout, Spin, Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Person } from "./types";

const { Title } = Typography;

function App() {
  const [data, setData] = useState<Person[]>([]);
  const [filteredData, setFilteredData] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Person[]>("/manipulate-data");
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);

    const lowercasedValue = value.toLowerCase();

    const newFilteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedValue) ||
        item.location.toLowerCase().includes(lowercasedValue) ||
        item.phone.toLowerCase().includes(lowercasedValue) ||
        item.cell.toLowerCase().includes(lowercasedValue)
    );

    setFilteredData(newFilteredData);
  };

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Umur",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Alamat",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "No. Telepon 1",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "No. Telepon 2",
      dataIndex: "cell",
      key: "cell",
    },
    {
      title: "Gambar",
      dataIndex: "picture",
      render: (pictures: string[]) => (
        <img
          src={pictures[0]}
          alt="Gambar"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="full-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout>
      <Content style={{ padding:"10px 80px" }}>
        <Title>List</Title>
          <Flex justify="space-between">
          <Input.Search
            placeholder="Cari..."
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300, marginBottom: 16 }}
          />
            <Button icon={<PlusOutlined />}>New Data</Button>
          </Flex>
          <Table dataSource={filteredData} columns={columns} rowKey="email" />
      </Content>
    </Layout>
  );
}

export default App;
