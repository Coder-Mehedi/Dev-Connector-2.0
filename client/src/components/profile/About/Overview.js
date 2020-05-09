import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setPopup } from "../../../action/popup";
import { getCurrent, deleteEducaion } from "../../../action/profile";

const Overview = ({ profile, setPopup, getCurrent, deleteEducaion }) => {
  let { education, address, experience, social, website } = profile;

  return (
    <div id="overview">
      <h1>Overview</h1>
      <div className="p-20">
        <div className="left">
          <div className="experience">
            <div className="top">
              <i
                className="fas fa-plus"
                onClick={(e) => setPopup({ exp: true })}
              ></i>
              <h6 className="add">Add Experience</h6>
            </div>
            {experience.map((exp) => (
              <Fragment key={exp._id}>
                {!exp.to && (
                  <div className="d-flex single-view">
                    <i className="fas fa-user-graduate single-icon"></i>
                    <div className="single-details">
                      <p>Work at {exp.company}</p>
                      <p>
                        Start in <Moment format="YYYY">{exp.from}</Moment>
                      </p>
                      <div className="mouse-in-out d-flex">
                        <p
                          className="mr-10"
                          onClick={(e) => {
                            setPopup({ exp: true });
                            getCurrent({ exp: exp });
                          }}
                        >
                          {" "}
                          Edit{" "}
                        </p>
                        <p> Delete </p>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
            <hr />
          </div>
          {/* Education */}
          <div className="education">
            <div className="top">
              <i
                className="fas fa-plus"
                onClick={(e) => setPopup({ edu: true })}
              ></i>
              <h6 className="add">Add Education</h6>
            </div>
            {education.map((edu) => (
              <Fragment key={edu._id}>
                {!edu.to && (
                  <div className="d-flex single-view" key={edu._id}>
                    <i className="fas fa-user-graduate single-icon"></i>
                    <div className="single-details">
                      <p>Studied at {edu.school}</p>
                      <p>
                        Start in <Moment format="YYYY">{edu.from}</Moment>
                      </p>
                      <div className="mouse-in-out d-flex">
                        <p
                          className="mr-10"
                          onClick={(e) => {
                            getCurrent({ edu: edu });
                            setPopup({ edu: true });
                          }}
                        >
                          Edit
                        </p>
                        <p onClick={(e) => deleteEducaion(edu._id)}>Delete</p>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
            <hr />
          </div>
          <div className="address">
            <h4 className="single-title">Address</h4>
            {address && (
              <div className="d-flex ">
                <i className="fas fa-map-marker-alt single-icon"></i>
                <div className="single-details">
                  <p>{address}</p>
                </div>
              </div>
            )}
            <hr />
          </div>
        </div>
        <div className="right">
          <div className="social-link">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  popup: state.popup,
});

export default connect(mapStateToProps, {
  setPopup,
  deleteEducaion,
  getCurrent,
})(Overview);
