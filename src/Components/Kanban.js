import React, { Component } from "react";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import { connect } from "react-redux";
import { addTask, updateTask } from "../Redux/KanbanSlice";

const task_statuses = {
  TODO: "TODO",
  INPROGRESS: "INPROGRESS",
  DONE: "DONE",
};

const Task = ({ onDragCard, id, name }) => {
  return (
    <div onDragStart={onDragCard} id={id} draggable={true} style={{ margin: 8, padding: 8, cursor: "move", backgroundColor: "#fff" }}>
      {name}
    </div>
  );
};

class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      taskName: "",
    };
    this.taskNameInput = React.createRef();
  }

  onDialogStateChange = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onAddTask = () => {
    const { taskName } = this.state;
    this.setState({ taskName: "" });
    const task = {
      name: taskName,
      description: "some desc",
      id: _.uniqueId("task_"),
      status: task_statuses.TODO,
    };
    this.props.dispatch(addTask(task));
    console.log("this.taskNameInput", this.taskNameInput);
    if (this.taskNameInput.current) {
      this.taskNameInput.current.focus();
    }
  };

  onDragCard = (e) => {
    e.dataTransfer.setData("text", e.target.id);
    console.log("on Drag card");
    // const element = document.getElementById(e.target.id);
    // element.style.opacity = "0.4";
  };

  onDrop = (e, newTaskStatus) => {
    // e.preventDefault();
    console.log("onDrop");

    const taskId = e.dataTransfer.getData("text");
    if (taskId) {
      this.props.dispatch(updateTask({ id: taskId, status: newTaskStatus }));
    }
  };

  allowToDrop = (e) => {
    console.log("allow to drop");
    e.preventDefault();
  };

  render() {
    const { isModalOpen, taskName } = this.state;
    const { kanban } = this.props;
    const todoTasks = kanban.tasks.filter((task) => task.status === task_statuses.TODO);
    const inprogressTasks = kanban.tasks.filter((task) => task.status === task_statuses.INPROGRESS);
    const doneTasks = kanban.tasks.filter((task) => task.status === task_statuses.DONE);

    return (
      <div>
        <IconButton onClick={this.onDialogStateChange}>
          <AddIcon />
        </IconButton>

        <Grid container spacing={2} className="px-16-py-0 text-center">
          <Grid item xs={4}>
            TO DO
          </Grid>
          <Grid item xs={4}>
            IN PROGRESS
          </Grid>
          <Grid item xs={4}>
            DONE
          </Grid>
        </Grid>

        <Grid container spacing={2} padding={2} className="kanban-tasks-scroll kb">
          <Grid item xs={4}>
            <Paper elevation={1} style={{ padding: 1, height: "100%", backgroundColor: "#f4f5f7" }}>
              <div style={{ height: "100%" }} onDragOver={this.allowToDrop} onDrop={(e) => this.onDrop(e, task_statuses.TODO)}>
                {todoTasks.map((task) => {
                  return <Task onDragCard={this.onDragCard} id={task.id} key={task.id} name={task.name} />;
                })}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={1} style={{ padding: 1, height: "100%", backgroundColor: "#f4f5f7" }}>
              <div style={{ height: "100%" }} onDragOver={this.allowToDrop} onDrop={(e) => this.onDrop(e, task_statuses.INPROGRESS)}>
                {inprogressTasks.map((task) => {
                  return <Task onDragCard={this.onDragCard} id={task.id} key={task.id} name={task.name} />;
                })}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={1} style={{ padding: 1, height: "100%", backgroundColor: "#f4f5f7" }}>
              <div style={{ height: "100%" }} onDragOver={this.allowToDrop} onDrop={(e) => this.onDrop(e, task_statuses.DONE)}>
                {doneTasks.map((task) => {
                  return <Task onDragCard={this.onDragCard} id={task.id} key={task.id} name={task.name} />;
                })}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Dialog fullWidth={true} maxWidth={"sm"} open={isModalOpen} onClose={this.onDialogStateChange}>
          <DialogTitle>Add Task </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>You can set my maximum width and whether to adapt or not.</DialogContentText> */}
            <TextField
              style={{ width: "100%" }}
              name="taskName"
              onChange={this.onChange}
              value={taskName}
              id="standard-basic"
              label="Enter Task "
              variant="standard"
              inputRef={this.taskNameInput}
              autoFocus={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onAddTask} disabled={!taskName.trim().length}>
              Add
            </Button>
            <Button onClick={this.onDialogStateChange}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  console.log("store", store);
  return {
    kanban: store.kanban,
  };
};

export default connect(mapStateToProps)(Kanban);
