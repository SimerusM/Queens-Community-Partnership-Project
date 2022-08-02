import React, { useEffect, useState } from 'react'
import ProjectDetails from '../ProjectDetails'
import Multiselect from "multiselect-react-dropdown"
import Select from 'react-select';


const SDGOptions = ["No Poverty", "Zero Hunger", "Good Health & Well Being", "Quality Education", "Gender Equality"]

const themesOptions = ["Demographic", "Economical", "Socio-cultural", "Technological", "Ecological", "Political"]

const assingmentOptions = ["Discussion Topics", "Assessment Ideas", "Mini Case Studies"]

class FilterBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: null,
            sdg: '',
            assignment_type: "",
            theme: '',
            
            testAssignments: "",

            testSDG: [""],

            testThemes: [""],

        };
  
        this.handleSDGChange = this.handleSDGChange.bind(this);
        this.handleAssignmentChange = this.handleAssignmentChange.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.testSubmit = this.testSubmit.bind(this);
    }
    
    // Handling all 3 input changes
    handleSDGChange(event) {
      this.setState({sdg: event.target.value});
    }

    handleAssignmentChange(event) {
        this.setState({assignment_type: event.target.value});
    }

    handleThemeChange(event) {
        this.setState({theme: event.target.value});
    }

    // FOR TESTING ONLY

    testSubmit() {
        alert(this.state.sdg + '--- Assignment Type: ' + this.state.assignment_type + '--- Theme: ' + this.state.theme);
    }


    // Handling all 3 input submissions
    handleSubmit(event) {
        console.log(this.state.sdg)
        // alert(this.state.sdg + '--- Assignment Type: ' + this.state.assignment_type + '--- Theme: ' + this.state.theme);
        event.preventDefault();

        console.log(this.state.projects)

        const data = {
            sdg: this.state.sdg, 
            assignment_type: this.state.assignment_type,
            theme: this.state.theme
        }

        fetch(`/api/projects/filter?sdg=${encodeURIComponent(data.sdg)}&assignment_type=${encodeURIComponent(data.assignment_type)}&theme=${encodeURIComponent(data.theme)}`, {
            method: "GET",
            headers: {
                    'Content-Type': 'application/json;charset=utf-8', 
                },
        })
            .then(response => response.json())
            // Add a loader here
            .then(json => this.setState({projects: json}))
    }

    async componentDidMount() {
        const response = await fetch('/api/projects')
        const json = await response.json()

        if (response.ok) {
            this.setState({projects: json})
        }
        
    }

    

    render() {
      return (
        <>
        <div className="filterHome">
            <div className="filterTableContainer">
                <div className="filterTableTitle">
                    Filter Table
                </div>
                <div className="filterSDGDropDown">
                    <div className="themeDropdown">
                        <Multiselect
                            isObject={false}
                            onRemove={(e) => {
                                this.setState({testSDG: e});
                            }}
                            onSelect={(e) => {
                                this.setState({testSDG: e});
                            }}
                            options={SDGOptions}
                            >
                                
                            {console.log(this.state.testSDG)}
                        </Multiselect>
                        <br></br>

                        <br></br>
                        <Multiselect
                            isObject={false}
                            onRemove={(e) => {
                                this.setState({testThemes: e});
                            }}
                            onSelect={(e) => {
                                this.setState({testThemes: e});
                            }}
                            options={themesOptions}
                            >
                                
                            {console.log(this.state.testThemes)}
                        </Multiselect>
                    </div>

                </div>
                <div>
                    <button onClick={this.testSubmit}>
                        Click
                    </button>
                </div>
            </div>

            {/* Lists projects */}
            <div>
                <div className="projects">
                    {this.state.projects && this.state.projects.map((project) => (
                        <ProjectDetails key={project._id} project={project}/>
                    ))}
                </div>
            </div>
        </div>
            {/* Test form */}
            <div className="test">
                <form onSubmit={this.handleSubmit}>
                        <label>SDG:</label>
                        <select value={this.state.sdg} onChange={this.handleSDGChange}>
                            <option value="">Any SDG</option>
                            <option value="SDG 1: No Poverty">SDG 1: No Poverty</option>
                            <option value="SDG 2: Zero Hunger">SDG 2: Zero Hunger</option>
                            <option value="SDG 3: Good Health & Well Being">SDG 3: Good Health & Well Being</option>
                            <option value="SDG 4: Quality Education">SDG 4: Quality Education</option>
                            <option value="SDG 5: Gender Equality">SDG 5: Gender Equality</option>
                            <option value="SDG 6: Decent Work & Economic Growth">SDG 6: Decent Work & Economic Growth</option>
                            <option value="SDG 7: Affordable & Clean Energy">SDG 7: Affordable & Clean Energy</option>
                            <option value="SDG 8: Decent Work & Economic Growth">SDG 8: Decent Work & Economic Growth</option>
                            <option value="SDG 9: Industry, Innovation, and Infrastructure">SDG 9: Industry, Innovation, and Infrastructure</option>
                            <option value="SDG 10: Reducing Inequality">SDG 10: Reducing Inequality</option>
                            <option value="SDG 11: Sustainable Cities & Communities">SDG 11: Sustainable Cities & Communities</option>
                            <option value="SDG 12: Responsible Consumption & Production">SDG 12: Responsible Consumption & Production</option>
                            <option value="SDG 13: Climate Action">SDG 13: Climate Action</option>
                            <option value="SDG 14: Life Below Water">SDG 14: Life Below Water</option>
                            <option value="SDG 15: Life on Land">SDG 15: Life on Land</option>
                            <option value="SDG 16: Peace and Justice Strong Institutions">SDG 16: Peace and Justice Strong Institutions</option>
                            <option value="SDG 17: Partnerships for the Goals">SDG 17: Partnerships for the Goals</option>
                        </select>

                        <label>Assignment Type:</label>
                        <select value={this.state.assignment_type} onChange={this.handleAssignmentChange}>
                            <option value="">Any Assignment Type</option>
                            <option value="1">1: Discussion Topics</option>
                            <option value="2">2: Assessment Ideas</option>
                            <option value="3">3: Mini Case Study</option>
                        </select>

                        <label>Theme:</label>
                        <select value={this.state.theme} onChange={this.handleThemeChange} multiple="multiple" size="7">
                            <option value="">Any Theme</option>
                            <option value="Demographic">Demographic</option>
                            <option value="Economical">Economical</option>
                            <option value="Socio-cultural">Socio-cultural</option>
                            <option value="Technological">Technological</option>
                            <option value="Ecological">Ecological</option>
                            <option value="Political">Political</option>
                        </select>

                        <input type="submit" value="Submit" />
                        
                    </form>
            </div>
        </>
      );
    }
  }
export default FilterBody