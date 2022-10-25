require 'test_helper'

class RateControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get rate_index_url
    assert_response :success
  end

end
