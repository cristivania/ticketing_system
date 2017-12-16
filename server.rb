require 'sinatra'

get '/' do
  File.new('public/js.html').readlines
end
