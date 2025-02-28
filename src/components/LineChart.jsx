import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import UserService from "../service/user";
import { Loader } from "./Loader";
import { createLineChart } from "../utils/buildLineChart";

const LineChart = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchAverageSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await UserService.fetchUserAverageSessions(userId);
      setData(response || []); // Les données sont déjà dans le bon format
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAverageSessions();
  }, [fetchAverageSessions]);

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      const chart = createLineChart("line-chart");
      chart.initialize(data);
      return chart.cleanup;
    }
  }, [data, isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div id="line-chart" className="line-chart"></div>
      )}
    </>
  );
};

LineChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export { LineChart };
