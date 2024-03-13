/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Contributors = ({ owner, repo }) => {
  console.log(owner, repo);
  const [totalChangesOptions, setTotalChangesOptions] = useState(null);
  const [contributorOptions, setContributorOptions] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("Commits");

  useEffect(() => {
    const fetchTotalChangesData = async () => {
      try {
        const commitActivityResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,
          {
            headers: {
              Authorization: `Bearer ${process.env.accessToken_git}`,
            },
          }
        );

        const codeFrequencyResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`,
          {
            headers: {
              Authorization: `Bearer ${process.env.accessToken_git}`,
            },
          }
        );

        const commitActivityData = commitActivityResponse.data;
        const codeFrequencyData = codeFrequencyResponse.data;

        if (
          Array.isArray(commitActivityData) &&
          Array.isArray(codeFrequencyData)
        ) {
          const metricIndex =
            selectedMetric === "Additions"
              ? 1
              : selectedMetric === "Deletions"
              ? 2
              : selectedMetric === "Commits"
              ? 0
              : 0;

          const options = {
            chart: {
              type: "line",
            },
            title: {
              text: `Total Changes`,
            },
            xAxis: {
              categories: commitActivityData.map((weekData) => {
                const date = new Date(weekData.week * 1000);
                return date.toISOString().slice(0, 10);
              }),
            },
            yAxis: {
              title: {
                text: "Count",
              },
            },
            series: [
              {
                name: selectedMetric,
                data:
                  selectedMetric === "Commits"
                    ? commitActivityData.map((weekData) => weekData.total)
                    : codeFrequencyData.map(
                        (weekData) => weekData[metricIndex]
                      ),
              },
            ],
          };

          setTotalChangesOptions(options);
        } else {
          console.error("Unexpected data format: not an array");
        }
      } catch (error) {
        console.error("Error fetching total changes data", error);
      }
    };

    const fetchContributorData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
          {
            headers: {
              Authorization: `Bearer ${process.env.accessToken_git}`,
            },
          }
        );

        const contributorData = response.data;

        if (Array.isArray(contributorData)) {
          const metricIndex =
            selectedMetric === "Additions"
              ? 1
              : selectedMetric === "Deletions"
              ? 2
              : selectedMetric === "Commits"
              ? 3
              : 0;

          const options = {
            chart: {
              type: "line",
            },
            title: {
              text: `Contributor Activity - ${selectedMetric}`,
            },
            xAxis: {
              categories: contributorData[0].weeks.map(
                (week) => `Week${week.w}`
              ),
            },
            yAxis: {
              title: {
                text: `Total ${selectedMetric}`,
              },
            },
            series: contributorData.map((contributor) => ({
              name: contributor.author.login,
              data: contributor.weeks.map(
                (week) => week[Object.keys(week)[metricIndex]]
              ),
            })),
          };

          setContributorOptions(options);
        } else {
          console.error("Unexpected data format: not an array");
        }
      } catch (error) {
        console.error("Error fetching contributor data", error);
      }
    };

    fetchTotalChangesData();
    fetchContributorData();
  }, [owner, repo, selectedMetric]);

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  return (
    <div>
      <div>
        <label>Select Metric:</label>
        <select onChange={(e) => handleMetricChange(e.target.value)}>
          <option value="Commits">Commits</option>
          <option value="Additions">Additions</option>
          <option value="Deletions">Deletions</option>
        </select>
      </div>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={totalChangesOptions}
        />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={contributorOptions} />
      </div>
    </div>
  );
};

export default Contributors;
