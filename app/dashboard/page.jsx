import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import SubHeader from "./_components/SubHeader";
import TaskSection from "./_components/TaskSection";

const Dashboard = () => {

  return (
    <div className="flex h-screen w-screen overflow-x-hidden">
      <Sidebar
        selectedProject="Mobile App"
      />
      <div className="w-screen">
      <div className="flex justify-between pt-3 w-full">
        <Header user={{ name: "Palak Jain", location: "Rajasthan, India", avatar: "/user.png" }} />
      </div>
      <main className="flex-1 p-4 ml-5">
        <SubHeader/>
        <TaskSection/>
      </main>
      </div>
      
      
    </div>
  );
};

export default Dashboard;
