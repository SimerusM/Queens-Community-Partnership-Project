import "../styles/ProjectDetails.css";
import React, { useState } from 'react';
import Popup from "./Popup";

const ProjectDetails = ({ project }) => {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonImagePopup, setButtonImagePopup] = useState(false);

    // console.log(project)
    // Extracting SDG title name's number and storing it in variable to use in details
    var str = project.sdg.toString()
    var sdg_num = str.match(/(\d+)/) 

    // Extracting just the SDG name and storing it in variable to use in details
    var indOfColon = 0
    for (let i = 0; i < project.sdg[0].length; i++) {
        if (project.sdg[0][i] === ':') {
            indOfColon = i
        }
    }
    var sdg_name = project.sdg[0].slice([indOfColon + 1])

    return (
     <>
        <div className="card-grid">
            <div className="card">
                
                <div className="card-header card-image">
                    <img 
                        src={require('../assets/SDGBanners/banner' + sdg_num[0] + '.jpg')}
                        alt="Banner to indicate different SDG's"
                    />
                </div>

                {/* Project descripton for Mini Case Studies */}
                {project.assignment_type === 'Mini Case Studies' &&
                    <>
                        <div className="card-title"><strong>{sdg_name}</strong></div>
                        <div className="card-mid">
                            <strong>Organization:</strong> {project.orginization}
                        </div>
                        <div className="card-body">
                            <strong>Description:</strong> {project.goal}
                        </div>

                        <div className="card-assignment">
                            <strong>Assignment Type:</strong> {project.assignment_type}
                        </div>

                        <div className="card-keywords">
                            <strong>Keywords:</strong> {project.keywords.map((kw)=>{
                                        if (kw !== project.keywords[project.keywords.length - 1]) {
                                            return kw + ', '
                                        }
                                        else {
                                            return kw
                                        }
                                    }
                                )}
                        </div>
                    </>
                }

                {/* Project descripton for Discussion Topics and Assessment Ideas */}
                {project.assignment_type !== 'Mini Case Studies' &&
                    <>
                        <div className="card-title"><strong>{sdg_name}</strong></div>
                        <div className="card-mid">
                            <strong>Organization:</strong> {project.orginization}
                        </div>
                        <div className="card-body">
                            <strong>Organization Goal(s):</strong> {project.goal}
                        </div>

                        <div className="card-assignment">
                            <strong>Assignment Type:</strong> {project.assignment_type}
                        </div>

                        <div className="card-assignment">
                            <strong>{project.assignment_type.slice(0, project.assignment_type.length - 1)}:</strong> {project.statement}
                        </div>

                        <div className="card-keywords">
                            <strong>Keywords:</strong> {project.keywords.map((kw)=>{
                                        if (kw !== project.keywords[project.keywords.length - 1]) {
                                            return kw + ', '
                                        }
                                        else {
                                            return kw
                                        }
                                    }
                                )}
                        </div>
                    </>
                }
                
                <div className="card-footer">
                    <button className="btn" onClick={() => setButtonPopup(true)}>Details</button>
                    {project.assignment_type === 'Mini Case Studies' &&
                        <>
                            <a href={project.sharepoint_link} without="true" rel="noopener noreferrer" target="_blank">
                                <button className="btn btn-outline">Download</button>
                            </a>
                            {/* <a href={'http://localhost:4000/images/' + project.img_filename} without="true" rel="noopener noreferrer" target="_blank">
                                <button className="btn" onClick={() => setButtonPopup(true)}>Preview</button>
                            </a> */}
                            <button className="btn" onClick={() => setButtonImagePopup(true)}>Preview</button>
                        </>
                    }
                    {project.assignment_type !== 'Mini Case Studies' &&
                        <button className="btn btn-outline" onClick={function(e){ navigator.clipboard.writeText(project.goal)
                            .then(() => {
                                alert('Text copied to clipboard!')
                            })
                            .catch(() => {
                                alert("Something went wrong!")
                            });
                        }}
                            >
                            Copy to Clipboard
                        </button>
                    }
                </div>
                
                {/* Pop up component that outlines the details of each project */}
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <div className="card-title"><strong>{sdg_name}</strong></div>
                    <div className="card-body">
                        <strong>Description:</strong> {project.goal}
                    </div>

                    <div className="card-assignment">
                        <strong>Assignment Type:</strong> {project.assignment_type}
                    </div>

                    <div className="card-assignment">
                        
                        {project.website_orginization !== '' ?
                            <div><strong>Organization:</strong> {project.orginization}</div>
                            :
                            <div><strong>Organization:</strong> No organization available</div>
                        }
                    </div>

                    <div className="card-assignment">
                        <strong>Published:</strong> {project.published}
                    </div>

                    <div className="card-assignment">
                        <strong>Website source URL: </strong> 
                        {project.website_url !== '' ?
                            <a style={{color: "blue"}} href={project.website_url} target="_blank" rel="noreferrer"><u>Website Link</u></a>
                            :
                            " No website link available"
                        }
                        
                    </div>

                    <div className="card-assignment">
                        <strong>Relationship Manager:</strong> {project.relationship_manager}
                    </div>

                    <div className="card-assignment">
                        {project.location !== '' ?
                            <div><strong>Location:</strong> {project.location}</div>
                            :
                            <div><strong>Location:</strong> No location available</div>
                        }
                    </div>

                    <div className="card-assignment">
                        <strong>Source: </strong> 
                        {project.source !== '' ?
                            <a style={{color: "blue"}} href={project.source} target="_blank" rel="noreferrer"><u>Source Link</u></a>
                            :
                            " No source link available"
                        }
                        
                    </div>
                </Popup>
                
                <Popup trigger={buttonImagePopup} setTrigger={setButtonImagePopup}>
                    <img src={project.img_filename} className="preview-img" alt="preview"></img>
                </Popup>

            </div>
        </div>
     </>

    )
}

export default ProjectDetails

