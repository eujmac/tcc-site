import { ResponsiveBar } from "@nivo/bar"
import { format, parse, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useAgendaRealTime } from "../../context/AgendaRealTimeContext"
const GraficoBarraDia = () => {
  const { agendaRealTime } = useAgendaRealTime()
  const daysArray = []
  let dadosBarraDia = []
  const somarPrecosPorData = dataAlvo => {
    return agendaRealTime
      .filter(item => {
        if (item.status !== "concluido") return
        const dataItem = parse(item.data, "dd/MM/yyyy", new Date())
        const dataAlvoComAno = parse(
          dataAlvo + "/2023",
          "dd/MM/yyyy",
          new Date()
        ) // Presumindo o ano corrente
        return format(dataItem, "dd/MM") === format(dataAlvoComAno, "dd/MM")
      })
      .flatMap(item => item.servicos)
      .reduce((total, servico) => total + parseFloat(servico.preco), 0)
  }
  for (let i = 0; i < 7; i++) {
    const date = subDays(new Date(), i)
    const formattedDate = format(date, "dd/MM", { locale: ptBR })
    const valor = somarPrecosPorData(formattedDate)
    daysArray.push(formattedDate)
    dadosBarraDia.push({
      dia: formattedDate,
      [formattedDate]: valor.toFixed(2),
    })
  }
  return (
    <ResponsiveBar
      data={dadosBarraDia.reverse()}
      keys={daysArray}
      indexBy="dia"
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.5}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: false }}
      colors={{ scheme: "tableau10" }}
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
      tooltip={({ id, value, color, indexValue }) => (
        <div
          style={{
            padding: "12px 16px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <strong style={{ color }}>{indexValue}</strong>
          <br />
          Valor: R$ {value}
        </div>
      )}
      ariaLabel="Nivo bar chart demo"
    />
  )
}

export default GraficoBarraDia
