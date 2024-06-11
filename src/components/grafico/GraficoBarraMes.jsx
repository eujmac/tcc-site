import { ResponsiveBar } from "@nivo/bar"
import { dadosBarraMes } from "../../utils/dados"
const GraficoBarraMes = () => {
  return (
    <ResponsiveBar
      data={dadosBarraMes}
      keys={["hot dog"]}
      indexBy="country"
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.3}
      maxValue={1000}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: false }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      enableLabel={false}
      enableTotals={true}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[]}
      animate={false}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={e =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  )
}

export default GraficoBarraMes
