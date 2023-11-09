precision highp float;

uniform float time;
uniform vec2 resolution;
uniform float audio;

const float PI = 3.14159265358;

float rand(vec2 n) 
{ 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float mod289(float x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

float noise(vec3 p)
{
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float noiseStack(vec3 pos,int octaves,float falloff){
	float n = noise(vec3(pos));
	float off = 1.0;
	if (octaves>1) {
		pos *= 2.0;
		off *= falloff;
		n = (1.0-off)*n + off*noise(vec3(pos));
	}
	if (octaves>2) {
		pos *= 2.0;
		off *= falloff;
		n = (1.0-off)*n + off*noise(vec3(pos));
	}
	if (octaves>3) {
		pos *= 2.0;
		off *= falloff;
		n = (1.0-off)*n + off*noise(vec3(pos));
	}
	return (1.0+n)/2.0;
}

vec2 noiseStackUV(vec3 pos,int octaves,float falloff,float diff){
	float displaceA = noiseStack(pos,octaves,falloff);
	float displaceB = noiseStack(pos+vec3(3984.293,423.21,5235.19),octaves,falloff);
	return vec2(displaceA,displaceB);
}

void main()
{
    float min_res = min(resolution.x, resolution.y);
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min_res;

    const float w = 0.05; // Line Width
    const vec3 c = vec3(0, 0.05, 1); // Line Color
    
    vec3 col = vec3(0);
    float alpha = 0.0;
    float y = sin((-time * 0.5 + uv.x * 1.25) * PI) / (3.0 + uv.x * uv.x * 8.0) * audio;
    float vy = uv.y + 0.4;
    
    float d1 = smoothstep(w, 0.0, abs(vy - y));
    col += c;
    alpha += d1;
    col += d1 * d1 * d1 * d1 * 0.5;
    
    float d2 = smoothstep(w, 0.0, abs(vy + y));
    col += c;
    alpha += d2;
    col += d2 * d2 * d2 * d2 * 0.5;
    
    float d3 = smoothstep(w, 0.0, abs(vy - y * 0.5));
    col += c;
    alpha += d3 * 0.3;
    col += d3 * d3 * d3 * d3 * 0.2;
    
    float d4 = smoothstep(w, 0.0, abs(vy + y * 0.5));
    col += c;
    alpha += d4 * 0.3;
    col += d4 * d4 * d4 * d4 * 0.2;
    
    // Sparks
    const float h = 8.0; // Height;
	float sparkGridSize = min_res / 20.0;
    float rt = time * 0.5;
	vec2 sparkCoord = gl_FragCoord.xy - sparkGridSize * vec2(0, h*rt);
	sparkCoord -= sparkGridSize*noiseStackUV(0.01*vec3(sparkCoord,30.0*time),1,0.4,0.1);
	if (mod(sparkCoord.y/sparkGridSize,2.0)<1.0) sparkCoord.x += 0.5*sparkGridSize;
	vec2 sparkGridIndex = vec2(floor(sparkCoord/sparkGridSize));
	float sparkRandom = rand(sparkGridIndex);
	float sparkLife = min(10.0*(1.0-min((sparkGridIndex.y)/(24.0-20.0*sparkRandom),1.0)),1.0) * (0.5 + 0.6 * audio);
	if (sparkLife > 0.0) {
	    float sparks = 0.0;
		float sparkSize = sparkRandom * 0.3;
		float sparkRadians = 999.0*sparkRandom*2.0*PI + 2.0*time;
		vec2 sparkCircular = vec2(sin(sparkRadians),cos(sparkRadians));
		vec2 sparkOffset = (0.5-sparkSize)*sparkGridSize*sparkCircular;
		vec2 sparkModulus = mod(sparkCoord+sparkOffset,sparkGridSize) - 0.5*vec2(sparkGridSize);
		float sparkLength = length(sparkModulus);
		float sparksGray = max(0.0, 1.0 - sparkLength/(sparkSize*sparkGridSize));
        float sm = smoothstep(-0.4, -0.0, uv.y) * smoothstep(1.0, 0.0, uv.y);
		sparks = sparkLife * sparksGray * sm;
        col += sparks * c + pow(sparkLife*sparksGray, 4.0) * sm;
        alpha += sparks;
	}

    float xp = 1.0 - abs(gl_FragCoord.x / resolution.x * 2.0 - 1.0);
    col.rgb *= xp * xp + y * y * 3.;
    alpha *= xp * xp + y * y * 5.;
    gl_FragColor = vec4(col, alpha);
}