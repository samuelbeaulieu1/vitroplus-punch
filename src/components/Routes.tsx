import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import AdminAccount from './Admin/Account/AdminAccount'
import Administration from './Admin/Administration'
import BranchPage from './Admin/Branch/Branch'
import Branches from './Admin/Branch/Branches'
import EmployeePage from './Admin/Employee/Employee'
import Employees from './Admin/Employee/Employees'
import EmployeeWorkReport from './Admin/Report/EmployeeWorkReport'
import WorkReports from './Admin/Report/WorkReports'
import Works from './Admin/Work/Works'
import Home from './Home'

const RoutesContainer: React.FC = (props) => {
  return (
    <Router>
        {props.children}
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='administration' element={<Administration/>}></Route>
            <Route path='administration/account' element={<AdminAccount/>}></Route>
            <Route path='administration/employees' element={<Employees/>}></Route>
            <Route path='administration/employee/:id' element={<EmployeePage/>}></Route>
            <Route path='administration/employee' element={<EmployeePage/>}></Route>
            <Route path='administration/branches' element={<Branches/>}></Route>
            <Route path='administration/branch/:id' element={<BranchPage/>}></Route>
            <Route path='administration/branch' element={<BranchPage/>}></Route>
            <Route path='administration/works' element={<Works/>}></Route>
            <Route path='administration/workReports' element={<WorkReports/>}></Route>
            <Route path='administration/workReport/between/:start/:end/for/:id' element={<EmployeeWorkReport/>}></Route>
            <Route path='administration/branches' element={<Administration/>}></Route>
        </Routes>
    </Router>
  )
}

export default RoutesContainer