import { ResponsiveBar } from "@nivo/bar"
import { useAgendaRealTime } from "../../context/AgendaRealTimeContext"
import { format, isAfter, parse, subDays, subMonths, subYears } from "date-fns"
import { ptBR } from "date-fns/locale"
const GraficoBarraMes = () => {
  const { agendaRealTime } = useAgendaRealTime()
  const arrayMeses = []
  let dadosBarraMes = []
  const getMonthNumber = month => {
    const months = {
      jan: 0,
      fev: 1,
      mar: 2,
      abr: 3,
      mai: 4,
      jun: 5,
      jul: 6,
      ago: 7,
      set: 8,
      out: 9,
      nov: 10,
      dez: 11,
    }
    return months[month]
  }
  const somaPrecosPeloMes = mesAno => {
    // mesAno == mes reduzido / ano completo numero
    const [mes, ano] = mesAno.split("/")
    const targetYear = parseInt(ano, 10)
    const targetMonth = getMonthNumber(mes)

    const filteredAgenda = agendaRealTime.filter(item => {
      if (item.status !== "concluido") return
      const [day, month, year] = item.data.split("/")
      const itemYear = parseInt(year, 10)
      const itemMonth = parseInt(month, 10) - 1 // Convertendo para zero-indexed
      return itemYear === targetYear && itemMonth === targetMonth
    })

    const totalPrice = filteredAgenda.reduce((total, item) => {
      const servicesTotal = item.servicos.reduce((serviceTotal, servico) => {
        return serviceTotal + parseFloat(servico.preco)
      }, 0)
      return total + servicesTotal
    }, 0)

    return totalPrice
  }

  for (let i = 0; i < 12; i++) {
    const data = subMonths(new Date(), i)
    const mesFormatado = format(data, "MMM/yyyy", { locale: ptBR })
    const valor = somaPrecosPeloMes(mesFormatado)
    arrayMeses.push(mesFormatado)
    dadosBarraMes.push({ mes: mesFormatado, [mesFormatado]: valor.toFixed(2) })
  }

  return (
    <ResponsiveBar
      data={dadosBarraMes.reverse()}
      keys={arrayMeses}
      indexBy="mes"
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.3}
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
        legend: "Meses",
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
    />
  )
}

export default GraficoBarraMes
