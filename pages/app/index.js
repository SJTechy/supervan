import styles from "../../styles/App.module.css";
import React from "react";
import moment from "moment";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Button,
  Badge,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";

import fetch from "node-fetch";

export default function Home() {
  const [data, setData] = React.useState({
    header: [],
  });
  const [change, setChange] = React.useState(0);

  const [badgeNumbers, setBadgeNumbers] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setBadgeNumbers(
          data.header.map((item) => {
            return true;
          })
        );
      });
  }, []);

  const increaseBadge = (badgeIndex) => {
    if (badgeNumbers[badgeIndex]) {
      var newData = data;

      newData.header[badgeIndex].badge = newData.header[badgeIndex].badge + 1;

      setData(newData);
      setChange(change + 1);

      fetch("/api/data", {
        method: "PATCH",
        body: JSON.stringify(newData),
      });

      var newBadge = badgeNumbers;
      newBadge[badgeIndex] = false;

      setBadgeNumbers(newBadge);
    } else {
      var newData = data;

      newData.header[badgeIndex].badge = newData.header[badgeIndex].badge - 1;

      setData(newData);
      setChange(change + 1);

      fetch("/api/data", {
        method: "PATCH",
        body: JSON.stringify(newData),
      });

      var newBadge = badgeNumbers;
      newBadge[badgeIndex] = true;

      setBadgeNumbers(newBadge);
    }
  };

  const deleteHeader = (index) => {
    var newData = data;

    newData.header.splice(index, 1);

    setData(newData);
    setChange(change + 1);

    var newBadge = badgeNumbers;
    newBadge.splice(index, 1);
    setBadgeNumbers(newBadge);

    fetch("/api/data", {
      method: "PATCH",
      body: JSON.stringify(newData),
    });
  };

  const addHeader = (title, subtitle) => {

    if (title === '') return

    var newData = data;

    newData.header.push({ title: title, subtitle: subtitle, badge: 0 });

    setData(newData);
    setChange(change + 1);

    var newBadge = badgeNumbers;
    newBadge.push(true);
    setBadgeNumbers(newBadge);

    fetch("/api/data", {
      method: "PATCH",
      body: JSON.stringify(newData),
    });
  };

  return (
    <div>
      <h1 className={styles.h1}>
        Welcome to Camp {data.name} | {moment().format("MMM Do YYYY")}
      </h1>
      <div className={styles.header}>
        {data.header.map((item, index) => {
          return (
            <Card className={styles.header_item} key={item.name + " "}>
              <CardContent key={item.name}>
                <Typography
                  component="h5"
                  variant="h5"
                  key={item.name + " title"}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  key={item.subtitle + " subtitle"}
                >
                  {item.subtitle}
                </Typography>
              </CardContent>
              <CardMedia>
                <IconButton onClick={() => increaseBadge(index)}>
                  <Badge badgeContent={item.badge} color="primary" showZero>
                    <FavoriteIcon />
                  </Badge>
                </IconButton>

                <IconButton onClick={() => deleteHeader(index)}>
                  <DeleteIcon />
                </IconButton>
              </CardMedia>
            </Card>
          );
        })}
      </div>
      <hr />
      <div className={styles.addHeader}>
        <div style={{ textAlign: "center" }} className={styles.signIn}>
          <TextField
            label="Title"
            variant="filled"
            fullWidth
            type="text"
            id="title"
          />
          <TextField
            label="Subtitle"
            variant="filled"
            fullWidth
            type="text"
            id="subtitle"
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "1rem" }}
            onClick={() =>
              addHeader(
                document.getElementById("title").value,
                document.getElementById("subtitle").value
              )
            }
          >
            Add Event
          </Button>
        </div>
      </div>
    </div>
  );
}
