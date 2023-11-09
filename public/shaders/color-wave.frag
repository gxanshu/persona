precision highp float;

uniform float time;
uniform vec2 resolution;
uniform float audio;

const float PI = 3.14159265358;

vec4 smin(vec4 a, vec4 b, float k) {
    float h = clamp(0.5 + 0.5 * (a.w - b.w) / k, 0.0, 1.0);
    return mix(a, b, h) - k * h * (1.0 - h);
}

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
        
void main()
{
    float min_res = min(resolution.x, resolution.y);
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min_res * 1.5;
    float xp = 1.0 + 2.0 * abs(gl_FragCoord.x / resolution.x * 2.0 - 1.0);
    float yp = abs(gl_FragCoord.y / resolution.y * 2.0 - 1.0);
    if (yp * xp * xp > 0.7)
        discard;
    float t = time;
    const float w = 0.01; // Line Width
    const float f = 1.0; // Frequency
    const float b = 50.0; // Bands
    float amp = 0.8 * audio; // Amplitude

    float xd = abs(uv.x);
    float falloff = (1.0 - exp(-xd * xd) + uv.x * uv.x * 0.05);
    vec4 d = vec4(vec3(0), 999999.0);
    float off = t * 2.0;
    float fm = (1.0 + 0.3 * sin(t));
    float x = uv.x * PI * f * fm - off;
    vec4 y1 = vec4(vec3(1.0, 0.0, 0.0), sin(x));
    vec4 y2 = vec4(vec3(0.0, 0.7, 1.0), sin(x + 1.0) * 0.5);
    vec4 y3 = vec4(vec3(1.0, 0.0, 1.0), sin(x + 1.8) * 1.1);
    vec4 y4 = vec4(vec3(0.0, 1.0, 1.0), sin(x + 3.0) * 0.7);
    float am = amp / (1.0 + xd * xd * 4.0);
    for (float i = 0.0; i <= 1.001; i += 1.0 / b) {
        vec4 y = mix(mix(y1, y2, i), mix(y3, y4, i), i);
        y.w = abs(uv.y - y.w * am) - w + falloff * 0.05;
        y.rgb *= y.rgb;
        d = smin(y, d, 0.05);
    }
    float a = 0.01;
    float c = smoothstep(a, -a, d.w);
    vec3 col = d.rgb * sqrt(c) * 0.5;
    col += pow(luma(col), 0.3) * 1.0;
    
    gl_FragColor = vec4(col, c);
}