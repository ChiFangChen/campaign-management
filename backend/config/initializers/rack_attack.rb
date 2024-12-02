class Rack::Attack
  throttle('req/ip', limit: 5, period: 1.minute) do |req|
    req.ip
  end

  safelist("allow localhost") do |req|
    ["127.0.0.1", "::1"].include?(req.ip)
  end

  self.throttled_responder = ->(request) {
    [
      429,
      { "Content-Type" => "text/plain" },
      ["Rate limit exceeded. Try again later.\n"]
    ]
  }
end