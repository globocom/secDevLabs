require 'test_helper'

class RatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @rate = rates(:one)
  end

  test "should get index" do
    get rates_url
    assert_response :success
  end

  test "should get new" do
    get new_rate_url
    assert_response :success
  end

  test "should create rate" do
    assert_difference('Rate.count') do
      post rates_url, params: { rate: { comment: @rate.comment, rate: @rate.rate, text: @rate.text } }
    end

    assert_redirected_to rate_url(Rate.last)
  end

  test "should show rate" do
    get rate_url(@rate)
    assert_response :success
  end

  test "should get edit" do
    get edit_rate_url(@rate)
    assert_response :success
  end

  test "should update rate" do
    patch rate_url(@rate), params: { rate: { comment: @rate.comment, rate: @rate.rate, text: @rate.text } }
    assert_redirected_to rate_url(@rate)
  end

  test "should destroy rate" do
    assert_difference('Rate.count', -1) do
      delete rate_url(@rate)
    end

    assert_redirected_to rates_url
  end
end
