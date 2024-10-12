import { ImageResponse } from 'next/og'

export const alt = 'Elliot'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          fontFamily: 'Noto Sans, Inter, "Material Icons"',
          padding: '80px 12rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
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
                backgroundColor: '#272727',
                width: '84px',
                height: '84px',
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
                backgroundColor: '#272727',
                width: '84px',
                height: '84px',
              }}
            ></div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <div
              style={{
                padding: '4px',
                backgroundColor: '#272727',
                width: '84px',
                height: '84px',
              }}
            ></div>
            <div
              style={{
                padding: '4px',
                backgroundColor: '#272727',
                width: '84px',
                height: '84px',
              }}
            ></div>
            <div
              style={{
                padding: '4px',
                backgroundColor: '#272727',
                width: '84px',
                height: '84px',
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
              color: '#272727',
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
              color: '#272727',
            }}
          >
            致虛極 守靜篤
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
