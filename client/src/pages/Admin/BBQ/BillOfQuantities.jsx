import React, { useState, useEffect, useCallback } from "react";
import "./BillOfQuantities.css";
import {
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import { API_URL_BBQ } from "../../../config/config";

export default function BillOfQuantities() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [items, setItems] = useState([]);
  const [nextItemId, setNextItemId] = useState(1);
  const [projectCode, setProjectCode] = useState("");

  // Calculate the current financial year
  const getFinancialYear = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const month = new Date().getMonth();
    return month >= 3 ? currentYear : currentYear - 1;
  }, []);

  // Generate the project code based on next item ID
  const generateProjectCode = useCallback(
    (nextItemId) => {
      const financialYear = getFinancialYear();
      return `BOQ/${financialYear}/${nextItemId}`;
    },
    [getFinancialYear]
  );

  useEffect(() => {
    const fetchProjectCode = async () => {
      try {
        const response = await axios.get(`${API_URL_BBQ}/lastBBQ`);
        const maxId = response?.data?.lastInsertedId || 1;
        setNextItemId(maxId + 1);
        setProjectCode(generateProjectCode(maxId + 1)); // Update project code based on max ID
      } catch (error) {
        console.error("Error fetching project code:", error);
      }
    };

    fetchProjectCode();
  }, [generateProjectCode]);

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { id: nextItemId, description: "", quantity: 0, unit: "", unitPrice: 0 },
    ]);
    setNextItemId((prevId) => prevId + 1);
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you would send data to your backend via an API call or another process
    try {
      await axios.post(`${API_URL_BBQ}/project`, {
        projectCode,
        projectName,
        projectDescription,
        items,
      });
      // Handle successful submission (e.g., clear form or show success message)
    } catch (error) {
      console.error("Error submitting BOQ:", error);
    }
  };

  console.log(projectCode);
  return (
    <div className="bbq-div">
      <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <Paper
          className="bbq-form"
          style={{ padding: "20px", marginBottom: "20px" }}
        >
          <Typography variant="h6">Submit Project Details:</Typography>
          <div style={{ margin: "20px 0" }}>
            <TextField
              label="Project Code"
              value={projectCode}
              fullWidth
              disabled
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <TextField
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div>
            <TextField
              label="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          </div>
        </Paper>

        <Paper className="bbq-form" style={{ padding: "20px" }}>
          <Typography variant="h6">Bill of Quantities</Typography>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TextField
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        placeholder="Item description"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            parseFloat(e.target.value)
                          )
                        }
                        placeholder="Quantity"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.unit}
                        onChange={(e) =>
                          updateItem(item.id, "unit", e.target.value)
                        }
                        placeholder="Unit"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unitPrice",
                            parseFloat(e.target.value)
                          )
                        }
                        placeholder="Unit Price"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      ₹ {(item.quantity * item.unitPrice).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteOutline />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={addItem}
              startIcon={<AddOutlined />}
            >
              Add Item
            </Button>
            <Typography variant="h6">
              Total: ₹{calculateTotal().toFixed(2)}
            </Typography>
          </div>
        </Paper>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Submit BOQ
        </Button>
      </form>
    </div>
  );
}
