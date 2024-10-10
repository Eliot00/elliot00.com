type OpenGraphImageProps = {
  background?: {
    accent: string
    light: string
    ultraLight: string
  }
  title?: string
}

export default function OpenGraphImage(props: OpenGraphImageProps) {
  const { background: bg, title } = props

  const containerBackground = bg
    ? {
        background: `linear-gradient(37deg, ${bg.accent} 27.82%, ${bg.light} 79.68%, ${bg.ultraLight} 100%)`,
      }
    : {
        backgroundColor: 'white',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
        backgroundSize: '100px 100px',
      }
  const logoStyle = bg
    ? { boxShadow: `4px 4px 8px ${bg.light}, -4px -4px 8px ${bg.accent}` }
    : { backgroundColor: '#272727' }
  const textColor = bg ? '#ffffff89' : '#272727'

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        fontFamily: 'Noto Sans, Inter, "Material Icons"',
        padding: '80px 12rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...containerBackground,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '256px',
          width: '256px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '84px',
              height: '84px',
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              width: '84px',
              height: '84px',
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <div
            style={{
              width: '84px',
              height: '84px',
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
          <div
            style={{
              width: '84px',
              height: '84px',
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
          <div
            style={{
              width: '84px',
              height: '84px',
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '3rem',
          width: '500px',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3
          style={{
            color: textColor,
            fontSize: '3.5rem',
            whiteSpace: 'nowrap',
          }}
        >
          Elliot
        </h3>
        <p
          style={{
            fontSize: '1.8rem',
            height: '5.2rem',
            overflow: 'hidden',
            lineClamp: 2,
            color: textColor,
          }}
        >
          致虛極 守靜篤
        </p>
      </div>
      {title ? (
        <p
          style={{
            position: 'absolute',
            left: 0,
            bottom: 4,
            backgroundColor: '#272727',
            color: '#FFFFFF95',
            borderRadius: '8px',
            padding: '0 1rem',
            width: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {title}
        </p>
      ) : null}
    </div>
  )
}
