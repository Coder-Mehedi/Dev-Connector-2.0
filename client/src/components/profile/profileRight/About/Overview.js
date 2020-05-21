import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import editIcon from "../../../../icons/edit.svg";
import addIcon from "../../../../icons/add.svg";
import schoolIcon from "../../../../icons/school.svg";
import workIcon from "../../../../icons/work.svg";
import addressIcon from "../../../../icons/pin.svg";

// Social
import fb from "../../../../icons/fb.svg";
import inst from "../../../../icons/inst.svg";
import lndin from "../../../../icons/linkdin.svg";
import twtter from "../../../../icons/twitter.svg";
import utube from "../../../../icons/youtube.svg";
import git from "../../../../icons/git.svg";
import web from "../../../../icons/web.svg";

// funtion
import { setPopup } from "../../../../action/popup";
import {
	getCurrent,
	deleteEducaion,
	profileUpdate,
	deleteExperience,
} from "../../../../action/profile";

const Overview = ({
	profile,
	setPopup,
	getCurrent,
	deleteEducaion,
	deleteExperience,
	user,
	profileUpdate,
}) => {
	// Get profile

	let {
		education,
		address,
		experience,
		social,
		website,
		username,
		githubusername,
	} = profile ? profile : "";

	const [addresstoggle, setAddresstoggle] = useState(false);

	const [fromdata, setFromdata] = useState({
		skills: profile && profile ? profile.skills.join(",") : "",
		status: profile && profile ? profile.status : "",
		address: address,
	});
	const onchange = (e) =>
		setFromdata({ ...fromdata, [e.target.name]: e.target.value });
	const onsubmite = (e) => {
		e.preventDefault();
		profileUpdate(fromdata);
		setAddresstoggle(false);
	};
	return (
		<div className="about-right">
			{/*  Single */}
			<div className="single">
				{username === user.username && (
					<div className="add flex">
						<img
							src={addIcon}
							className="svg-img"
							onClick={(e) => setPopup({ edu: true })}
							alt=""
						/>
						<h3>Add Educaion</h3>
					</div>
				)}
				{education &&
					education.map((edu) => (
						<Fragment key={edu._id}>
							{!edu.to && (
								<div className="single-items flex">
									<img src={schoolIcon} className="svg-img" alt="" />
									<div className="details">
										<p className="text">
											Study {edu.fieldofstudy} at <b>{edu.school}</b> <br />{" "}
											from <Moment format="YYYY">{edu.from}</Moment>
										</p>
										{username === user.username && (
											<div className="flex edit-delete">
												<p
													className="text"
													onClick={(e) => {
														setPopup({ edu: true });
														getCurrent({ edu: edu });
													}}
												>
													Edit
												</p>
												<p
													className="text"
													onClick={(e) => deleteEducaion(edu._id)}
												>
													Delete
												</p>
											</div>
										)}
									</div>
								</div>
							)}
						</Fragment>
					))}

				<hr />
			</div>
			{/*  Single */}
			<div className="single">
				{username === user.username && (
					<div className="add flex">
						<img
							src={addIcon}
							className="svg-img"
							onClick={(e) => setPopup({ exp: true })}
							alt=""
						/>
						<h3>Add Experrience</h3>
					</div>
				)}
				{experience &&
					experience.map((exp) => (
						<Fragment key={exp._id}>
							{!exp.to && (
								<div className="single-items flex">
									<img src={workIcon} className="svg-img" alt="" />
									<div className="details">
										<p className="text">
											Work at <b>{exp.company}</b> as a {exp.title} <br /> from{" "}
											<Moment format="YYYY">{exp.from}</Moment>
										</p>
										{username === user.username && (
											<div className="flex edit-delete">
												<p
													className="text"
													onClick={(e) => {
														getCurrent({ exp: exp });
														setPopup({ exp: true });
													}}
												>
													Edit
												</p>
												<p
													className="text"
													onClick={(e) => deleteExperience(exp._id)}
												>
													Delete
												</p>
											</div>
										)}
									</div>
								</div>
							)}
						</Fragment>
					))}

				<hr />
			</div>
			{address && (
				<Fragment>
					<div className="single-items flex">
						<img src={addressIcon} className="svg-img" alt="" />
						{addresstoggle ? (
							<form className="form" onSubmit={onsubmite}>
								<div className="form-group">
									<input
										type="text"
										name="address"
										onChange={(e) => onchange(e)}
										value={fromdata.address}
									/>
								</div>
								<div className=" flex text">
									<input type="submit" value="Save" />
									<p onClick={(e) => setAddresstoggle(false)}>Cancel</p>
								</div>
							</form>
						) : (
							<Fragment>
								<p className="text">Live in {fromdata.address}</p>
								{username === user.username && (
									<img
										src={editIcon}
										onClick={(e) => setAddresstoggle(true)}
										className="svg-img edit-icon"
										alt=""
									/>
								)}
							</Fragment>
						)}
					</div>{" "}
					<hr />
				</Fragment>
			)}

			<div className="single-items">
				<div className="social-icons">
					<ul className="flex">
						{social && social.facebook && (
							<li>
								<a
									href={social.facebook}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={fb} className="svg-img" alt="" />
								</a>
							</li>
						)}
						{social && social.instagram && (
							<li>
								<a
									href={social.instagram}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={inst} className="svg-img" alt="" />
								</a>
							</li>
						)}

						{social && social.linkedin && (
							<li>
								<a
									href={social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={lndin} className="svg-img" alt="" />
								</a>
							</li>
						)}

						{social && social.twitter && (
							<li>
								<a
									href={social.twitter}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={twtter} className="svg-img" alt="" />
								</a>
							</li>
						)}

						{social && social.youtube && (
							<li>
								<a
									href={social.youtube}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={utube} className="svg-img" alt="" />
								</a>
							</li>
						)}
						{githubusername && (
							<li>
								<a
									href={`http://github.com/${githubusername}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={git} className="svg-img" alt="" />
								</a>
							</li>
						)}
						{website && (
							<li>
								<a href={website} target="_blank" rel="noopener noreferrer">
									<img src={web} className="svg-img" alt="" />
								</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	popup: state.popup,
});

export default connect(mapStateToProps, {
	profileUpdate,
	setPopup,
	deleteEducaion,
	getCurrent,
	deleteExperience,
})(Overview);
