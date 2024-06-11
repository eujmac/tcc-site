import { ResponsiveBar } from "@nivo/bar"
import { format, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
const GraficoBarraDia = () => {
  const daysArray = []
  let dadosBarraDia = []
  for (let i = 0; i < 7; i++) {
    const date = subDays(new Date(), i)
    const formattedDate = format(date, "dd/MM", { locale: ptBR })
    const randomValue = Math.floor(Math.random() * 1000)
    daysArray.push(formattedDate)
    dadosBarraDia.push({ dia: formattedDate, [formattedDate]: randomValue })
  }
  console.log(daysArray)
  console.log(dadosBarraDia)
  return (
    <ResponsiveBar
      data={dadosBarraDia}
      keys={daysArray}
      indexBy="dia"
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
        legend: "Dias",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Valor",
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
    />
  )
}

export default GraficoBarraDia
