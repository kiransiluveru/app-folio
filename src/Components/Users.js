import { CircularProgress, Grid, Pagination } from "@mui/material";
import axios from "axios";
import _ from "lodash";
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../Redux/UsersSlice";

// class Users extends Component {
//   componentDidMount() {
//     this.props.dispatch(fetchUsers());
//   }

//   render() {

//     return <div> </div>;
//   }
// }

const User = ({ userInfo }) => {
  return (
    <div className="user-card">
      <div className="avatar">
        <div>AB</div>
      </div>
      <div className="bold">{userInfo.name}</div>
      <div>{userInfo.email}</div>
      <div>{userInfo.phone}</div>
      <div>
        <a href={"https://" + userInfo.website} target="_blank">
          {userInfo.website}
        </a>
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setUsersLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers((prev) => {
          return _.shuffle([...response.data]);
        });

        setUsersLoading(false);
      })
      .catch((e) => {
        console.log("error while fetching users", e);
      });
  }, [currentPage]);

  const onPaginationChange = (e, value) => {
    // console.log("e", e, value);
    setCurrentPage(value);
  };
  return (
    <>
      <Pagination className="pt-8 d-flex justify-center" page={currentPage} onChange={onPaginationChange} count={10} variant="outlined" shape="rounded" />
      {usersLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4} padding={3}>
          {users.map((user, i) => {
            return (
              <Grid xs={4} item key={i + " " + user.id}>
                <User userInfo={user} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (store) => {
  return {
    users: store.users.usersList,
  };
};

export default connect(mapStateToProps, null)(Users);
