import { useLocation, useNavigate } from "react-router"
import Navbar from "~/utils/navbar";

const Result2Page = () => {
      const location = useLocation();
      const data = (location.state as { combinedData?: any })?.combinedData;

      return (
          <>
              <Navbar />
              <div>
                  <h1>Results</h1>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
          </>
  );
}
export default Result2Page