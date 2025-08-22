import React, { useState, useEffect } from "react";
import { API_URL_USER } from "../../../config/config";
import { Input, Box, useTheme } from "@mui/material";
import "./styles.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useAuthStore } from "../../../store/authStore";
import { useGetAPIStore } from "../../../store/getAPIStore";
import { tokens } from "../../../theme";
import DataTable from "../../../components/table/DataTable";
import { formatDate } from "../../../utils/date";
import SearchBox from "../../../components/Search/SearchBox";
import Button from "../../../components/Button/Button";

const Users = () => {
  const { loading, data, error, fetchData, reset } = useGetAPIStore();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { signup } = useAuthStore();

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [selectedUserType, setSelectedValue] = useState("");

  const [page, setPage] = useState(0);

  const handlePageClick = (event) => {
    fetchUsers(event.selected + 1);
    setPage(event.selected);
  };

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const fetchUsers = async (currentPage = 1) => {
    fetchData(`${API_URL_USER}/users?page=${currentPage}&limit=5`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const dataSet = {
      email: formData.email,
      password: "Sayaib009@",
      name: formData.name,
      userType: selectedUserType,
      phoneNo: parseInt(formData.phone),
    };
    await signup(dataSet);
    fetchUsers(page + 1);
    setShowPopup(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);
  const columns = [
    { key: "userType", header: "User Type" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phoneNo", header: "Phone" },
    {
      key: "createdAt",
      header: "Created",
      render: (value) => formatDate(value),
    },
    {
      key: "updatedAt",
      header: "Updated",
      render: (value) => formatDate(value),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (value) => formatDate(value),
    },
  ];

  return (
    <div className="User">
      <div className="header">
        <h2>Define Users</h2>
        <div className="top-table-div">
          <div className="searchbox_div">
            <SearchBox />
          </div>
          <Button
            style={{ background: colors.primary[400] }}
            onClick={() => setShowPopup(true)}
          >
            Add User
          </Button>
        </div>
      </div>
      <Box>
        <DataTable
          data={data !== null ? data.users : []}
          columns={columns}
          count={Math.ceil(data?.total / 5)}
          clickFunction={handlePageClick}
        />
      </Box>

      {showPopup && (
        <Box backgroundColor={colors.primary[400]} className="popup">
          <form onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              onChange={handleInputChange}
              required
            />
            <div>
              <label htmlFor="dropdown">Select an option:</label>
              <select
                id="dropdown"
                value={selectedUserType}
                onChange={handleDropdownChange}
                required
              >
                <option value="" disabled>
                  --Choose an option--
                </option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
              {selectedUserType && (
                <p>
                  You selected: <strong>{selectedUserType}</strong>
                </p>
              )}
            </div>
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={() => setShowPopup(false)}>
              Cancel
            </Button>
          </form>
        </Box>
      )}
    </div>
  );
};

export default Users;
