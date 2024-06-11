import { ResponsiveLine } from "@nivo/line"
import { format, isAfter, parse, subDays } from "date-fns"
import { useAgendaRealTime } from "../../context/AgendaRealTimeContext"

const GraficoLinha = () => {
  const { agendaRealTime } = useAgendaRealTime()

  const today = new Date()
  const groupAndFilterData = data => {
    const lastWeek = subDays(today, 8)
    const groupedData = {}

    data.forEach(item => {
      if (item.status !== "concluido") return
      const data = parse(item.data, "dd/MM/yyyy", new Date())
      if (isAfter(data, lastWeek)) {
        const formattedDate = format(data, "dd/MM/yyyy")
        if (!groupedData[formattedDate]) {
          groupedData[formattedDate] = 0
        }
        groupedData[formattedDate]++
      }
    })

    return groupedData
  }

  const grupo = groupAndFilterData(agendaRealTime)

  const transformedData = Object.entries(grupo).map(([date, count]) => ({
    x: date,
    y: count,
  }))

  const dadosGrafico = [
    {
      id: "cortes",
      color: "hsl(106, 70%, 50%)",
      data: transformedData,
    },
  ]
  return (
    <ResponsiveLine
      data={dadosGrafico}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "1",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Datas",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Cortes",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      enableGridX={false}
      enablePoints={true}
      pointSize={5}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableCrosshair={false}
      useMesh={true}
      animate={false}
    />
  )
}

export default GraficoLinha