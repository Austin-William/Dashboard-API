import React from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import "../styles/Create.css";

function Create() {
  return (
    <div className="Create">
      <HeaderDashboard />

      <div className="Create-content">
        <h1>Create</h1>
        <div className="Create-content-widget">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea className="form-control" id="content" rows="3" placeholder="Content"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;