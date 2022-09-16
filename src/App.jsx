import "./App.css";
import Header from "./Header.jsx";
import Employees from "./Employees.jsx";
import Footer from "./Footer.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GroupedTeamMembers from "./GroupedTeamMembers.jsx";
import Nav from "./Nav.jsx";
import NotFound from "./NotFound.jsx";
import employeeData from "./data/data.jsx";

const App = () => {
    const [selectedTeam, setTeam] = useState(
        JSON.parse(localStorage.getItem("selectedTeam")) || "TeamB"
    );

    const [employees, setEmployees] = useState(
        JSON.parse(localStorage.getItem("employeeList")) || employeeData
    );

    const handleTeamSelectionChange = (e) => {
        setTeam(e.target.value);
    };

    const handleEmployeeCardClick = (e) => {
        const transformedEmployees = employees.map((employee) =>
            employee.id === parseInt(e.currentTarget.id)
                ? employee.teamName === selectedTeam
                    ? { ...employee, teamName: "" }
                    : { ...employee, teamName: selectedTeam }
                : employee
        );

        setEmployees(transformedEmployees);
    };

    useEffect(() => {
        localStorage.setItem("employeeList", JSON.stringify(employees));
    }, [employees]);

    useEffect(() => {
        localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
    }, [selectedTeam]);

    return (
        <Router>
            <Nav />
            <Header
                selectedTeam={selectedTeam}
                teamMemberCount={
                    employees.filter(
                        (employee) => employee.teamName === selectedTeam
                    ).length
                }
            />
            <Routes>
                <Route
                    path={"/"}
                    element={
                        <Employees
                            employees={employees}
                            selectedTeam={selectedTeam}
                            handleEmployeeCardClick={handleEmployeeCardClick}
                            handleTeamSelectionChange={
                                handleTeamSelectionChange
                            }
                        />
                    }
                ></Route>
                <Route
                    path={"/groupedTeamMembers"}
                    element={
                        <GroupedTeamMembers
                            employees={employees}
                            selectedTeam={selectedTeam}
                            setTeam={setTeam}
                        />
                    }
                ></Route>
                <Route path={"*"} element={<NotFound />}></Route>
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
