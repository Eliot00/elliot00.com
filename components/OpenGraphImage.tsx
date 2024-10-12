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
    ? {
        boxShadow: `4px 4px 8px ${bg.light}, -4px -4px 8px ${bg.accent}`,
        width: '76px',
        height: '76px',
      }
    : { backgroundColor: '#272727', width: '84px', height: '84px' }
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
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: bg ? '14px' : '2px',
          }}
        >
          <div
            style={{
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
          <div
            style={{
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
          <div
            style={{
              padding: '4px',
              ...logoStyle,
            }}
          ></div>
        </div>
      </div>
      {title ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'column',
            textAlign: 'right',
          }}
        >
          <h1
            style={{
              color: 'rgba(255, 255, 255, 0.92)',
              fontSize: '50px',
              overflow: 'hidden',
              maxHeight: '150px',
              fontWeight: 'bold',
            }}
          >
            {title}
          </h1>
          <h2
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '38px',
              fontWeight: 'lighter',
            }}
          >
            Elliot
          </h2>
        </div>
      ) : (
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
      )}
    </div>
  )
}
