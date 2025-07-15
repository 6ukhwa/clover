$(document).ready(function(){



            alert('게임을 시작하시겠습니까?')
            let time = 600; // 60초 * 10 (0.1초 단위로 계산)
            let timerInterval;
            let isRainbowActive = false;

            function updateTimer() {
                let minutes = Math.floor(time / 600);
                let seconds = Math.floor((time % 600) / 10);
                let tenths = time % 10;
                
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                
                $("#timer").text(minutes + ":" + seconds + ":" + tenths);
                
                if (time === 200 && !isRainbowActive) { // 10초 남았을 때
                    $("body").addClass("rainbow-bg");
                    isRainbowActive = true;

                    // .cat 이 보임
                    $(".cat").css("display", "block");

                }
                
                if (time === 0) {
                    clearInterval(timerInterval);
                    alert("타이머 종료! 클로버는 못찾았지만 넘 즐거웠잔아!\n완전 럭키 비키니시티~ദ്ദിᐡ,,•ᴥ•,,ᐡ ꒱ \생일 축하합니다~!");
                    // cat 이 안보이기 시작
                    $(".cat").css("display", "none");
                    $("body").removeClass("rainbow-bg");
                    isRainbowActive = false;
                }
                time--;
            }

            // 타이머 자동 시작
            clearInterval(timerInterval);
            timerInterval = setInterval(updateTimer, 100);

            // 리셋 버튼
            $("#resetBtn").click(function() {
                clearInterval(timerInterval);
                time = 600;
                $("#timer").text("01:00:0");
                timerInterval = setInterval(updateTimer, 100);
                $("body").removeClass("rainbow-bg");
                isRainbowActive = false;

                // cat 이 안보이기 시작
                $(".cat").css("display", "none");
            });

            // 리셋 버튼 도망가기
            $("#resetBtn").on("mouseenter", function() {
                let containerWidth = $(".timer_wrap").width();
                let containerHeight = $(".timer_wrap").height();
                let btnWidth = $(this).outerWidth();
                let btnHeight = $(this).outerHeight();

                let maxX = containerWidth - btnWidth;
                let maxY = containerHeight - btnHeight;

                let randomX = Math.floor(Math.random() * maxX);
                let randomY = Math.floor(Math.random() * maxY);

                $(this).css({
                    "position": "absolute",
                    "left": randomX + "px",
                    "top": randomY + "px"
                });
            });

            // 네잎클로버 클릭시 크기 커지기
            $('.clover').click(function(){
                $(this).addClass('enlarged')
                // 타이머 멈추기
                clearInterval(timerInterval);
                // 리셋버튼 사라지기
                $('#resetBtn').css({'display':'none'});
                // #cong 등장
                $('#cong').fadeIn(2000)
                // 세잎클로버와 grass 배경 사라지기
                $('.box div').addClass('hide')
                $('.imgBox').addClass('hide')

                // 10초 남았을 때 효과 제거
                $("body").removeClass("rainbow-bg");
                    isRainbowActive = false;

                // .cat 이 보이기 시작
                $(".cat").css("display", "none");

                // 시작점으로 설정할 요소 가져오기
                const canvas = $('.btn_confetti')[0];
                
                // Canvas 요소의 위치 정보를 가져오기
                const canvasRect = canvas.getBoundingClientRect();
                var duration = 15 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
                }

                var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }, 250);
                
                // Canvas Confetti 라이브러리를 사용하여 효과 적용
                confetti({
                    particleCount: 400,
                    spread: 180,
                    origin: {
                        x: (canvasRect.left + canvasRect.width / 2) / window.innerWidth,
                        y: (canvasRect.top + canvasRect.height / 2) / window.innerHeight
                    }
                });
            })

            // 세잎 클로버 클릭시 햄스터 이미지 등장
            $('.box div').click(function(){
                $('.ham').addClass('show')
                setTimeout(function(){
                    $('.ham').removeClass('show')
                }, 500)
            })



     })
