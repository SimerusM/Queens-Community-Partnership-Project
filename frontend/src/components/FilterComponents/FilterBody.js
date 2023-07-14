import React, { useEffect, useState } from 'react'
import ProjectDetails from '../ProjectDetails'
import Multiselect from "multiselect-react-dropdown"
import Select from 'react-select';

// Importing different arrays
import { keywordsOptions } from './CategoryArrays/KeywordsOptions'
import { SDGOptions } from './CategoryArrays/SdgOptions';
import { assingmentOptions } from './CategoryArrays/AssignmentOptions';
import { organizationOptions } from './CategoryArrays/OrganizationOptions';

// Main component handling the filter body
class FilterBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Variables
            projects: null,
            assignment_type: "",
            sdg: [""],
            theme: [""],
            keywords: [""],
            orginization: "",

            jsonLength: 1,
            
            showProjects: true,
            // Select module features
            isClearable: true,
            isSearchable: true,
        };
  
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.testSubmit = this.testSubmit.bind(this);
    }

    // Handling all 3 input submissions
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ showProjects: true })

        const data = {
            sdg: this.state.sdg, 
            assignment_type: this.state.assignment_type,
            orginization: this.state.orginization,
            keywords: this.state.keywords
        }

        fetch(`/api/projects/filter?sdg=${encodeURIComponent(data.sdg)}&assignment_type=${encodeURIComponent(data.assignment_type)}&orginization=${encodeURIComponent(data.orginization)}&keywords=${encodeURIComponent(data.keywords)}`, {
            method: "GET",
            headers: {
                    'Content-Type': 'application/json;charset=utf-8', 
                },
        })
            .then(response => response.json())
            .then(json => (this.setState({projects: json, jsonLength: json.length})))
            .then(jsonLength => console.log(jsonLength))
        
    }

    async componentDidMount() {
        const response = await fetch('/api/projects')
        const json = await response.json()

        if (response.ok) {
            this.setState({projects: json})
        }
        
    }

    projectDisplay() {
        return (
            <>
                <div className="content">
                    {this.state.projects && this.state.projects.map((project) => (
                        <ProjectDetails key={project._id} project={project}/>
                    ))}
                </div>
            </>
        )
    }

    noProjectDisplay() {
        return (
            <>
                <div className="no-project-container">
                    <div className="no-project-card">
                        <div className="no-project-msg">
                            <strong>Sorry!</strong> There are no projects available given your specified search queries! If you can't find the project that you're looking for, <strong><a href="/contact" style={{color: "blue"}}>Contact Us</a></strong>!
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }


    render() {
      return (
        <>
            <div className="filterHome">
                <div className="filterContainer">
                    <div className="filterTableContainer">
                        <div className="filterTableTitle">
                            Filter Table
                        </div>
                        <div className="filterInstructBlurb">
                            <div>To filter your results, please type in or select search queries from the following categories. When you have finished making your selections, please click out of the <em>Filter Table</em> dropdown and then click <em>‘Filter’</em>.</div>
                        </div>
                        
                        <div className="filterSDGDropDown">
                            <div className="themeDropdown">
                                <div className="filter-subtitle">Sustainable Development Goal:</div>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select"
                                    // isClearable={this.state.isClearable}
                                    isSearchable={this.state.isSearchable}
                                    name="color"
                                    onChange={(e) => {
                                        this.setState({ sdg: e.value })
                                    }}
                                    options={SDGOptions}   
                                />

                                <br></br>

                                <div className="filter-subtitle">Assignment Type:</div>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select"
                                    // isClearable={this.state.isClearable}
                                    isSearchable={this.state.isSearchable}
                                    name="color"
                                    onChange={(e) => {
                                        this.setState({ assignment_type: e.value })
                                        
                                    }}
                                    options={assingmentOptions}                 
                                />

                                <br></br>

                                <div className="filter-subtitle">Organization:</div>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    placeholder="Select"
                                    // isClearable={this.state.isClearable}
                                    isSearchable={this.state.isSearchable}
                                    name="color"
                                    onChange={(e) => {
                                        this.setState({ orginization: e.value })
                                        console.log(e)
                                    }}
                                    options={organizationOptions}                 
                                />

                                <br></br>

                                <div className="filter-subtitle">Keyword(s):</div>
                                <Multiselect
                                    isObject={false}
                                    onRemove={(e) => {
                                        this.setState({keywords: e});
                                    }}
                                    onSelect={(e) => {
                                        this.setState({keywords: e});
                                    }}
                                    options={keywordsOptions}
                                />
                            </div>

                        </div>
                        <div className="filterButtonContainer">
                            <button className="filterButton" onClick={this.handleSubmit}>
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lists projects */}
                
                <div className="projects">
                    {this.state.jsonLength > 0 ? this.projectDisplay() : this.noProjectDisplay()}
                </div>
            </div>
        </>
      );
    }
  }
export default FilterBody

