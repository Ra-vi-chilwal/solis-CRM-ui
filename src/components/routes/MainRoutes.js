import React, { Children } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import UpdatewebsitesLead from '../../views/Source/WebsiteLead/UpdateWebsitesLead'
import RejectModal from '../../views/Source/subManualData/RejectLeadModal'
import LinkdineLead from '../../views/Source/LinkdinLead/linkdin'
import InstagramLead from '../../views/Source/InstagramLead/instagram'
import JustdialLead from '../../views/Source/JustdialLead/justdialLead'
import AllLead from '../../views/dashboard/CardsLead/AllLead'
import NotesModal from '../../views/dashboard/NotesModal'
import AllLeads from '../../views/dashboard/CardsLead/AllLead'
import Getalllead from '../../views/GetAllLead/Getalllead'
import AddProduct from '../../views/AdminTool/Products/AddProduct'
const Dashboard = React.lazy(() => import('../../views/dashboard/Dashboard'))
const Role = React.lazy(() => import('../../views/AdminTool/Role'))
const Plan = React.lazy(() => import('../../views/AdminTool/Plan'))
const Company = React.lazy(() => import('../../views/AdminTool/Company'))
const User = React.lazy(() => import('../../views/AdminTool/User'))
const Custom = React.lazy(() => import('../../views/Source/ManualData'))
const UpdateLead = React.lazy(() => import('../../views/Source/subManualData/UpdateLead'))
const Facebook = React.lazy(() => import('../../views/Source/FacebookLead/getFacebookLead'))
const WebsitesLead = React.lazy(() => import('../../views/Source/WebsiteLead/WebsiteLeadDetails'))
const  GoogleAds = React.lazy(() => import('../../views/Source/GoogleAds/googleAds'))
const SubMenual = React.lazy(() => import('../../views/Source/subManualData/subManualDetails'))
const Profile = React.lazy(() => import('../../views/pages/Profile/profile'));
const Invoice = React.lazy(()=> import('../../views/Invoice/invoice') )
const AddInvoice = React.lazy(()=> import('../../views/Invoice/addInvoice') )
const InvoiceDetails = React.lazy(()=> import('../../views/Invoice/invoiceDetails') )
const Products = React.lazy(()=> import('../../views/AdminTool/Products') )
const MainRoutes = {
        path: "/",
        element: <DefaultLayout />,
        children: [
                {
                        path: '/',
                        permissions: [{ label: "Read", value: "read" },],
                        element: <Dashboard />
                },
                {
                        path: 'admin-tool/user',
                        permissions: [{ label: "Read", value: "read" }, { label: "Create", value: "create" }, { label: "Update", value: "update" }, { label: "Delete", value: "delete" }],
                        element: <User />
                },
                {
                        path: 'admin-tool/plan',
                        permissions: [{ label: "Read", value: "read" }, { label: "Create", value: "create" }, { label: "Update", value: "update" }, { label: "Delete", value: "delete" }, { label: "Root", value: "root" }],
                        element: <Plan />
                },
                {
                        path: 'admin-tool/company',
                        permissions: [{ label: "Read", value: "read" }, { label: "Create", value: "create" }, { label: "Update", value: "update" }, { label: "Delete", value: "delete" }, { label: "Root", value: "root" }],
                        element: <Company />
                },
                {
                        path: 'admin-tool/role',
                        permissions: [{ label: "Read", value: "read" }, { label: "Create", value: "create" }, { label: "Update", value: "update" }, { label: "Delete", value: "delete" }],
                        element: <Role />
                },
                {
                        path: 'admin-tool/products',
                        permissions: [{ label: "Read", value: "read" }, { label: "Create", value: "create" }, { label: "Update", value: "update" }, { label: "Delete", value: "delete" }],
                        element: <Products />
                },

                //facebook
                {
                        path: 'source/facebook',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <Facebook />
                },
                //websites
                {

                        path: 'source/all-leads',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <AllLeads />

                },
                {

                        path: 'source/custom/getAllLead',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <Getalllead />

                },
                {

                        path: 'source/all-leads',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <AllLead />

                },
                {

                        path: 'source/notes',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <NotesModal />

                },
                {

                        path: 'source/all',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <WebsitesLead />

                },
                {

                        path: 'source/website/:id',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <UpdatewebsitesLead />

                },
                {

                        path: 'source/custom',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <Custom />
                },
                {

                        path: 'source/linkedin',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <LinkdineLead />
                },
                {

                        path: '/source/instagram',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <InstagramLead />
                },
                {

                        path: '/source/justdial',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <JustdialLead/>
                },
                {

                        path: '/source/google-ads',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <GoogleAds/>
                },
                {
                        path: 'source/custom/update/:id',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <UpdateLead />
                },
                {
                        path: 'source/custom/getAllLead/update/:id',
                        permissions: [{ label: "Read", value: "read" }],
                        element: <UpdateLead />
                },
                {
                        path: 'source/custom/:id',
                        permissions: [{ label: "Read", value: "read" }],
                        element: < SubMenual />
                },
                {
                        path: 'source/custom/getAllLead/:id',
                        permissions: [{ label: "Read", value: "read" }],
                        element: < SubMenual />
                },
                {
                        path: '/profile',
                        permissions: [{ label: "Read", value: "read" }],
                        element: < Profile />
                },
                {
                        path: '/invoice/add/:id',
                        permissions: [{ label: "Read", value: "read" }],
                        element: < AddInvoice />
                },
                {
                        path: '/invoice/:id',
                        permissions: [{ label: "Read", value: "read" }],
                        element: < InvoiceDetails />
                },
                {
                        path: '/invoice/get/:id',
                        permissions: [{ label: "Read", value: "read" }],
                        element: < Invoice />
                },
         
        ]
}

export default MainRoutes;

