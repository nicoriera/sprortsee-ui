import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import UserService from "../service/user";
import { Loader } from "./Loader";
import { createRadialBarChart } from "../utils/buildRadialBarChart";

const RadialBarChart = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const svgRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const userData = await UserService.fetchUserInfo(userId);
      setData(userData);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isLoading && data) {
      const chart = createRadialBarChart("radial-bar-chart");
      chart.initialize(data);
      return chart.cleanup;
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="radial-bar-chart" className="radial-bar-chart">
      <h2 className="chart-title">Score</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

RadialBarChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export { RadialBarChart };
